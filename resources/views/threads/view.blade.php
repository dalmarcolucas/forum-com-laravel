@extends('layouts.default')

@section('content')
    
    <div class="container">
        <h3>{{$result->title}}</h3>

        <div class="card grey lighten-4">
            <div class="card-content">
                {{ $result->body }}
            </div>
        </div>

        <replies-component
            replied="{{__('Replied')}}"
            reply="{{__('Reply')}}"
            your-answer="{{__('Yor answer')}}"
            send="{{__('Send')}}"
        >
            @include('layouts.default.preloader')
        </replies-component>
    </div>

@endsection

@section('scripts')
<script src="/js/replies.js"></script>
@endsection

