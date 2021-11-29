<p align="center">
  <img src="https://raw.githubusercontent.com/acidjazz/laranuxt/main/resources/laranuxt.png" width="300" />
</p>

> Now supporting [Nuxt v3](https://v3.nuxtjs.org)

## Laravel + Nuxt.js Boilerplate

[![](https://img.shields.io/badge/nuxt.js-v2.15.8-04C690.svg)](https://nuxtjs.org)
[![](https://img.shields.io/badge/Laravel-v8.60.0-ff2e21.svg)](https://laravel.com)
![Test PHP](https://github.com/acidjazz/laranuxt/workflows/Test%20PHP/badge.svg)
![Test Javascript](https://github.com/acidjazz/laranuxt/workflows/Test%20Javascript/badge.svg)
[![Lint Javascript](https://github.com/acidjazz/laranuxt/actions/workflows/lint-js.yml/badge.svg)](https://github.com/acidjazz/laranuxt/actions/workflows/lint-js.yml)
[![Lint PHP](https://github.com/acidjazz/laranuxt/actions/workflows/lint-php.yml/badge.svg)](https://github.com/acidjazz/laranuxt/actions/workflows/lint-php.yml)

![](resources/laranuxt.gif?raw=true)

> Now with examples on using Dark Mode and the Nuxt Api module!

### What is included

* [NUXT v3](https://v3.nuxtjs.org) front end, a progressive Vue.js framework - For Nuxt v2 visit [this branch](https://github.com/fumeapp/laranuxttree/nuxt2)
  * [tailvue](https://github.com/fumeapp/tailvue) a collection of components built for Nuxt.js, powered by WindiCSS|TailwindCSS
  * Authentication library to assist with user sessions and logging in/out
  * Example Authentication Middleware

* [Laravel](https://laravel.com) - for our API - `v8.60.0`
  * [Model Typer](https://github.com/fumeapp/modeltyper) - Generates Typescript interfaces from Laravel Models 
  * [MetAPI](https://github.com/acidjazz/metapi) - API helpers and utilities
  * [debugbar](https://github.com/barryvdh/laravel-debugbar) - awesome debugbar for our API
  * [ide-helper](https://github.com/barryvdh/laravel-ide-helper) - Helper files to enable help with IDE autocompletion

### Installation

* clone from GitHub
* run `yarn` and `composer install` to install all of your deps
* copy `.env.example` to `.env` and configure it to your likings
* TL;DR
 ```bash
git clone git@github.com:acidjazz/laranuxt.git; cd laranuxt; yarn; composer install; cp .env.example .env;
 ```
* Feel free to delete excess media in  `/resources/`


### Local Environment
* run `yarn dev` in one terminal for our nuxt dev setup
* run `yarn api` (alias for `./artisan serve`) in another terminal for our laravel API

### Authentication

* TODO
