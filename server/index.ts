import * as Reflect from "reflect-metadata"
import {createConnection} from "typeorm";
import express from "express";
import bodyParser from "body-parser";
import {Request, Response} from "express";
import {Routes} from "./routes";
import Bundler from 'parcel-bundler'
import path from 'path';
import proxy from 'http-proxy-middleware'

createConnection().then(async connection => {

    // create express app
    const app = express();
    app.use(bodyParser.json());


    // register express routes from defined application routes
    Routes.forEach((route:any) => {
        (app as any)[route.method]('/api'+route.route, (req: Request, res: Response, next: Function) => {
            const result = (new (route.controller as any))[route.action](req, res, next);
            if (result instanceof Promise) {
                result.then(result => result !== null && result !== undefined ? res.send(result) : undefined);

            } else if (result !== null && result !== undefined) {
                res.json(result);
            }
        });
    });


    let bundler = new Bundler('./index.html', {
        outDir: './build'
    })
    app.use(bundler.middleware())

    // setup express app here
    app.get('*', function (request, response){
        response.sendFile(path.resolve(__dirname, '../build', 'index.html'))
    })

    // start express server
    app.listen(8080);


}).catch(error => console.log(error));
