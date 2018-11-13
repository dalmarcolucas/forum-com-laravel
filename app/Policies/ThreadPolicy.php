<?php

namespace App\Policies;

use App\User;
use App\Thread;
use Illuminate\Auth\Access\HandlesAuthorization;

class ThreadPolicy
{
    use HandlesAuthorization;

    /**
     * Determine if the given post can be updated by the user.
     *
     * @param  \App\User  $user
     * @param  \App\Thread  $thread
     * @return bool
     */
    public function update(User $user, Thread $thread)
    {
        return $user->id === $thread->user_id;
    }
}
