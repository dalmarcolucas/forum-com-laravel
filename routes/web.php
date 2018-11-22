<?php

use  \App\Thread;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('threads.index');
});

Route::get('/threads/{id}', function ($id) {
    $result = Thread::findOrFail($id);
    return view('threads.view', compact('result'));
});

Route::get('/locale/{locale}', function ($locale) {
    session(['locale' => $locale]);

    return back();
});

Route::get('/login/{provider}', 'SocialAuthController@redirect');
Route::get('/login/{provider}/callback', 'SocialAuthController@callBack');

Route::get('/threads', 'ThreadsController@index');
Route::get('/replies/{id}', 'RepliesController@show');

Route::middleware(['auth'])
    ->group( function(){
        Route::post('/threads', 'ThreadsController@store');
        Route::put('/threads/{thread}', 'ThreadsController@update');
        Route::get('/threads/{thread}/edit', function(Thread $thread) {
            return view('threads.edit', compact('thread'));
        });

        Route::post('/replies', 'RepliesController@store');
        Route::get('/replies/highlight/{id}', 'RepliesController@highlight');
        Route::get('/threads/pin/{thread}', 'ThreadsController@pin');
        Route::get('/threads/close/{thread}', 'ThreadsController@close');

        Route::get('/profile', 'ProfileController@edit');
        Route::post('/profile', 'ProfileController@update');

    });

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
