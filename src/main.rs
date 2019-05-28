#![feature(proc_macro_hygiene, decl_macro)]

#[macro_use] extern crate rocket;

use rocket_contrib::templates::Template;
use std::collections::HashMap;
use rocket_contrib::serve::StaticFiles;

#[get("/")]
fn index() -> Template {
    let mut context: HashMap<String, String> = HashMap::new();
    Template::render("index", context)
}

fn main() {
    rocket::ignite()
        .mount("/", routes![index])
        .mount("/static", StaticFiles::from("static"))
        .attach(Template::fairing())
        .launch();
}
