import { EventController } from "./controller/EventController";

export const Routes = [{
    method:"get",
    route: "/events",
    controller: EventController,
    action : "all",
}, {
    method:"get",
    route: "/events/:id",
    controller: EventController,
    action : "one",
}, {
    method:"post",
    route:"/events",
    controller :EventController,
    action:"save"
}, {
    method:"patch",
    route:"/events/:id",
    controller :EventController,
    action:"modify"
}, {
    method:"delete",
    route:"/events/:id",
    controller :EventController,
    action:"remove"
}, {
    method:"delete",
    route:"/events",
    controller :EventController,
    action:"removeAll"
}
];