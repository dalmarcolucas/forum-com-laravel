@extends('layouts.default')

@section('content')
    
    <div class="container">
    <h3>{{__('Most recent threads')}}</h3>
        <threads-component
            title="{{__('Threads')}}"
            threads="{{__('threads')}}"
            replies="{{__('replies')}}"
            open="{{__('open')}}"
            new-thread="{{__('New Thread')}}"
            new-title="{{__('Title')}}"
            new-body="{{__('Body')}}"
            send="{{__('Send')}}"
        >
             @include('layouts.default.preloader')
        </threads-component>
    </div>

@endsection

@section('scripts')
    <script src="/js/threads.js"></script>
@endsection

