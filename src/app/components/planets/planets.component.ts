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
        const gl = this.canvas.nativeElement.getContext("webgl2");

        //Enables some GL state
        gl.enable(gl.BLEND)
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LESS);

        const earthInfo = {
            programInfo: twgl.createProgramInfo(gl, [this.vertexShader!, this.fragmentShader!]),
            bufferInfo: twgl.createBufferInfoFromArrays(gl, {
                position: this.earthModel
            }),
        };

        let debugPoints: number[] = [];

        this.levels!.forEach(level => {
            const loc = this.locationToSphere(level.location);

            debugPoints = debugPoints.concat(loc);
        });

        const debugInfo = {
            programInfo: twgl.createProgramInfo(gl, [this.debugVertexShader!, this.debugFragmentShader!]),
            bufferInfo: twgl.createBufferInfoFromArrays(gl, {
                position: debugPoints
            }),
        };

        let proj = twgl.m4.perspective(Math.PI / 2 / 1.2, 1, 0.00001, 100);
        let view = twgl.m4.lookAt(twgl.v3.create(0, 0, -2), twgl.v3.create(0, 0, 0), twgl.v3.create(0, 1, 0));
        let model = twgl.m4.rotationY(0);

        //Begin the render process
        requestAnimationFrame(render);

        function render(time: number) {
            twgl.resizeCanvasToDisplaySize(gl.canvas);
            gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

            //Clear color and depth buffers
            gl.clearColor(0, 0, 0, 0);
            gl.clearDepth(1);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

            const uniforms = {
                model: model,
                view: view,
                proj: proj,
            };

            model = twgl.m4.rotationY(time * 0.0005);

            gl.useProgram(earthInfo.programInfo.program);

            twgl.setBuffersAndAttributes(gl, earthInfo.programInfo, earthInfo.bufferInfo);
            twgl.setUniforms(earthInfo.programInfo, uniforms);
            twgl.drawBufferInfo(gl, earthInfo.bufferInfo);

            gl.useProgram(debugInfo.programInfo.program);

            twgl.setBuffersAndAttributes(gl, debugInfo.programInfo, debugInfo.bufferInfo);
            twgl.setUniforms(debugInfo.programInfo, uniforms);
            twgl.drawBufferInfo(gl, debugInfo.bufferInfo, gl.POINTS);

            //Keep the loop going
            requestAnimationFrame(render);
        }
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
