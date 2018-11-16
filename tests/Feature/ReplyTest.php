<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Reply;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\DatabaseMigrations;

class ReplyTest extends TestCase
{
    use DatabaseMigrations;

    public function testListagemDeRespostasPorTopico()
    {
        $user = factory(\App\User::class)->create();
        $this->seed('RepliesTableSeeder');

        $replies = Reply::where('thread_id', 2)->get();

        $response = $this->actingAs($user)->json('GET', '/replies/2');

        $response->assertStatus(200)
            ->assertJson($replies->toArray());
    }

    public function testInclusaoDeNovaResposta()
    {
        $user = factory(\App\User::class)->create();
        $thread = factory(\App\Thread::class)->create();

        $response = $this->actingAs($user)->json('POST', '/replies', [
            'body' => 'Resposta no fórum',
            'thread_id' => $thread->id,
        ]);

        $reply = Reply::find(1);

        $response->assertStatus(200)
            ->assertJson($reply->toArray());
    }
}
