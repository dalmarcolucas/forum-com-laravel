<ul id="locale" class='dropdown-content'>
    <li><a href="/locale/pt-br">Português</a></li>
    <li><a href="/locale/en">English</a></li>
</ul>

@auth
<ul id="user" class="dropdown-content">
    <li><a href="/profile">{{ __('Profile') }}</a></li>
    <li>
        <a href="{{ route('logout') }}"
            onclick="event.preventDefault();
                        document.getElementById('logout-form').submit();">
            {{ __('Logout') }}
        </a>

        <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
            {{ csrf_field() }}
        </form>
    </li>
</ul>
@endauth

<div class="parallax-container">
    <nav>
        <div class="nav-wrapper">
            <div class="container">
                <a href="/" class="brand-logo">{{__('My Heroes - Forum')}}</a>

                <ul class="right">
                    <li>
                        <a data-target="locale" href='#' class="dropdown-trigger btn">{{ __('Language') }}</a>
                    </li>
                    @guest
                    <li class="nav-item">
                        <a class="nav-link" href="{{ route('login') }}">{{ __('Login') }}</a>
                    </li>
                    <li class="nav-item">
                        @if (Route::has('register'))
                        <a class="nav-link" href="{{ route('register') }}">{{ __('Register') }}</a> @endif
                    </li>
                    @else
                    <li>
                        <a href="#!" data-target="user" class="dropdown-trigger btn">{{ \Auth::user()->name }}</a>
                    </li>

                    @endguest
                </ul>
            </div>
        </div>

    </nav>

    <div class="parallax">
        <img src="http://materializecss.com/images/parallax1.jpg" alt="">
    </div>
</div>