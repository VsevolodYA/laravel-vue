<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Auth\RegisterController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Auth\Events\Registered;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthenticateController extends Controller
{
    public function authenticate(Request $request)
    {
        // grab credentials from the request
        $credentials = $request->only('email', 'password');

        try {
            // attempt to verify the credentials and create a token for the user
            if (! $token = JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'Invalid credentials'], 401);
            }
        } catch (JWTException $e) {
            // something went wrong whilst attempting to encode the token
            return response()->json(['error' => 'Could not create token'], 500);
        }

        // all good so return the token
        $user = Auth::user();
        return response()->json(compact('token', 'user'));
    }

//    public function registration(Request $request)
//    {
//        app('App\Http\Controllers\Auth\RegisterController')->validator($request->all())->validate();
//
//        event(new Registered($user = $this->create($request->all())));
//
//        $this->guard()->login($user);
//
//        return $this->registered($request, $user)
//            ?: redirect($this->redirectPath());
//    }
}
