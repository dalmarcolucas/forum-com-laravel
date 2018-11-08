<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class localeTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    public function testRoute()
    {
        $respose = $this->get('/locale/en');
        
        $respose->assertStatus(302);
    }

    public function testTranslation()
    {
        $respose = $this->withSession(['locale' => 'pt-br'])->get('/');
        
        $respose->assertSee('Tópicos mais recentes');
    }
}
