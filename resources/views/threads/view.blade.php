@extends('layouts.default')

@section('content')
    
    <div class="container">
        <h3>{{$result->title}}</h3>

        <div class="card grey lighten-4">
            <div class="card-content">
                {{ $result->body }}
            </div>
            <div class="card-action">
                @can ('update', $result)
                    <a href="/threads/{{$result->id}}/edit">{{__('Edit')}}</a>
                @endcan
                <a href="/">{{__('Back')}}</a>
            </div>
        </div>

        <replies-component
            replied="{{__('Replied')}}"
            reply="{{__('Reply')}}"
            your-answer="{{__('Yor answer')}}"
            send="{{__('Send')}}"
            thread-id={{$result->id}}
            is-closed={{$result->closed}}
        >
            @include('layouts.default.preloader')
        </replies-component>
    </div>

@endsection

@section('scripts')
<script src="/js/replies.js"></script>
@endsection

