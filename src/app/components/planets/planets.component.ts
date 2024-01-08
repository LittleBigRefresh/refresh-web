import * as twgl from 'twgl.js';
import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from 'src/app/api/types/user';
import {ApiClient} from 'src/app/api/api-client.service';
import {Level} from "../../api/types/level";
import {concatWith, forkJoin, mergeWith, Observable, Subscription} from "rxjs";
import {Location} from "../../api/types/location";

@Component({
  selector: 'planets',
  templateUrl: './planets.component.html',
})
export class PlanetsComponent implements OnInit {
    @ViewChild('canvas') public canvas!: ElementRef
    didInit: boolean = false

    @Input("user") public User: User | undefined;

    private levels: Level[] | undefined;
    private earthModel: number[] = [];
    private vertexShader: string | undefined;
    private fragmentShader: string | undefined;
    private debugVertexShader: string | undefined;
    private debugFragmentShader: string | undefined;

    private mouseDown: boolean = false;

    private oldX: number = 0;
    private oldY: number = 0;

    private rotX: number = 0;
    private rotY: number = 0;

    private gl: any | undefined;
    private debugInfo: { bufferInfo: twgl.BufferInfo; programInfo: twgl.ProgramInfo } | undefined;
    private earthInfo: { bufferInfo: twgl.BufferInfo; programInfo: twgl.ProgramInfo } | undefined;

    private lastInteraction: number = 0;

    constructor(private apiClient: ApiClient, private httpClient: HttpClient) {
    }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
        const username = this.User!.username;

        forkJoin([
            this.apiClient.GetLevelsByUser(username, 40, 0),
            this.httpClient.get("/assets/earth/earth.obj", {responseType: "text"}),
            this.httpClient.get("/assets/earth/earth.vs.glsl", {responseType: "text"}),
            this.httpClient.get("/assets/earth/earth.fs.glsl", {responseType: "text"}),
            this.httpClient.get("/assets/earth/debug.vs.glsl", {responseType: "text"}),
            this.httpClient.get("/assets/earth/debug.fs.glsl", {responseType: "text"}),
        ]).subscribe(res => {
            this.levels = res[0].items;
            this.earthModel = this.parseObj(res[1]);
            this.vertexShader = res[2];
            this.fragmentShader = res[3];
            this.debugVertexShader = res[4];
            this.debugFragmentShader = res[5];

            this.didInit = true;
            this.main();
        });
    }

    parseObj(file: string) {
        let verts = [];
        let idx: number[] = [];

        for(let line of file.split("\n")) {
            let split = line.split(" ");

            if(split[0] == 'v') {
                verts.push([parseFloat(split[1]), parseFloat(split[2]), parseFloat(split[3])]);
            } else if(split[0] == 'f') {
                idx.push(parseInt(split[1].split("/")[0]));
                idx.push(parseInt(split[2].split("/")[0]));
                idx.push(parseInt(split[3].split("/")[0]));
            }
        }

        let ret: number[] = [];

        for(let index of idx) {
            let vert = verts[index - 1];

            ret.push(vert[0]);
            ret.push(vert[1]);
            ret.push(vert[2]);
        }

        return ret;
    }

    main() {
        this.gl = this.canvas.nativeElement.getContext("webgl2");

        //Enables some GL state
        this.gl.enable(this.gl.BLEND)
        this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);

        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.depthFunc(this.gl.LESS);

        this.earthInfo = {
            programInfo: twgl.createProgramInfo(this.gl, [this.vertexShader!, this.fragmentShader!]),
            bufferInfo: twgl.createBufferInfoFromArrays(this.gl, {
                position: this.earthModel
            }),
        };

        let debugPoints: number[] = [];

        this.levels!.forEach(level => {
            const loc = this.locationToSphere(level.location);

            debugPoints = debugPoints.concat(loc);
        });

        this.debugInfo = {
            programInfo: twgl.createProgramInfo(this.gl, [this.debugVertexShader!, this.debugFragmentShader!]),
            bufferInfo: twgl.createBufferInfoFromArrays(this.gl, {
                position: debugPoints
            }),
        };

        this.gl.canvas.addEventListener('mousemove', (e: any) => {
            this.lastInteraction = Date.now();

            if(this.mouseDown) {
                this.rotX += e.pageX - this.oldX;
                this.rotY -= e.pageY - this.oldY;
            }

            this.oldX = e.pageX;
            this.oldY = e.pageY;
        }, false);
        this.gl.canvas.addEventListener('mousedown', () => this.mouseDown = true, false);
        this.gl.canvas.addEventListener('mouseup', () => this.mouseDown = false, false);

        //Begin the render process
        requestAnimationFrame(time => this.render(time));
    }

    render(time: number) {
        if(Date.now() - this.lastInteraction > 5000) {
            this.rotX += 0.1;
            this.rotY = this.rotY * 0.95;
        }

        twgl.resizeCanvasToDisplaySize(this.gl.canvas);
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);

        //Clear color and depth buffers
        this.gl.clearColor(0, 0, 0, 0);
        this.gl.clearDepth(1);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

        let proj = twgl.m4.perspective(Math.PI / 2 / 1.2, 1, 0.00001, 100);
        let view = twgl.m4.lookAt(twgl.v3.create(0, 0, -2), twgl.v3.create(0, 0, 0), twgl.v3.create(0, 1, 0));
        let model =  twgl.m4.rotateY(twgl.m4.rotationX(this.rotY / 200), this.rotX / 200);

        const uniforms = {
            model: model,
            view: view,
            proj: proj,
        };

        // model = twgl.m4.rotationY(time * 0.0005);

        //Use the earth shader
        this.gl.useProgram(this.earthInfo!.programInfo.program);

        //Set the buffers to the earth buffers
        twgl.setBuffersAndAttributes(this.gl, this.earthInfo!.programInfo, this.earthInfo!.bufferInfo);
        //Set the uniforms
        twgl.setUniforms(this.earthInfo!.programInfo, uniforms);
        //Draw the buffers
        twgl.drawBufferInfo(this.gl, this.earthInfo!.bufferInfo);

        //Use the debug shader
        this.gl.useProgram(this.debugInfo!.programInfo.program);

        //Set the debug buffers
        twgl.setBuffersAndAttributes(this.gl, this.debugInfo!.programInfo, this.debugInfo!.bufferInfo);
        //Set the uniforms
        twgl.setUniforms(this.debugInfo!.programInfo, uniforms);
        //Draw the buffers
        twgl.drawBufferInfo(this.gl, this.debugInfo!.bufferInfo, this.gl.POINTS);

        //Keep the loop going
        requestAnimationFrame(time => this.render(time));
    }

    locationToSphere(location: Location): number[] {
        let lat = -((location.x / (65535 / 2)) * 180 - 90) * (Math.PI / 180);
        let lon = -((location.y / 65535) * 360 - 180) * (Math.PI / 180);

        const rad = 1.025;

        let x = Math.cos(lat) * Math.cos(lon) * rad;
        let z = Math.cos(lat) * Math.sin(lon) * rad;
        let y = Math.sin(lat) * rad;

        return [x, y, z];
    }
}
