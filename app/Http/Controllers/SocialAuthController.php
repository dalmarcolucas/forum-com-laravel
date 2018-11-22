<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Socialite;
use App\SocialAuth;
use App\User;

class SocialAuthController extends Controller
{
  public function redirect($provider)
  {
        return Socialite::driver($provider)->redirect();
  }

  public function callBack($provider)
  {
     $userProvider = Socialite::driver($provider)->user();

     $account =  SocialAuth::where([
         'provider' => $provider,
         'social_id' => $userProvider->id
     ])->first();

     if($account){
        auth()->login($account->user);
        return redirect()->to('/');
     }

     $localUser = User::where('email', $userProvider->email)->first(); 

     if($localUser){
        return redirect()->to('/');
     }

     $newUser = new User();
     $newUser->name = $userProvider->name;
     $newUser->email = $userProvider->email;
     $newUser->password = md5(rand(1, 1000));
     $newUser->save();

     $account = new SocialAuth();
     $account->provider = $provider;
     $account->social_id  = $userProvider->id;
     $account->user_id = $newUser->id;
     $account->save();

     auth()->login($newUser);

     return redirect()->to('/');
  }
}
