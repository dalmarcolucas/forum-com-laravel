@extends('layouts.default')

@section('content')
    
    <div class="container">
    <h3>{{__('Most recent threads')}}</h3>
        <threads-component
            title="{{__('Threads')}}">
             @include('layouts.default.preloader')
        </threads-component>
    </div>

@endsection

@section('scripts')
    <script src="/js/threads.js"></script>
@endsection

