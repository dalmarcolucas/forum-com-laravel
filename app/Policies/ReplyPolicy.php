<?php

namespace App\Policies;

use App\User;
use App\Reply;
use Illuminate\Auth\Access\HandlesAuthorization;

class ReplyPolicy
{
    use HandlesAuthorization;

    /**
     * Determine if the given post can be updated by the user.
     *
     * @param  \App\User  $user
     * @param  \App\Reply  $reply
     * @return bool
     */
    public function update(User $user, Reply $reply)
    {
        return $user->role === 'admin';
    }

    public function closed(User $user, Reply $reply)
    {
        return !$reply->thread->closed;
    }
}
