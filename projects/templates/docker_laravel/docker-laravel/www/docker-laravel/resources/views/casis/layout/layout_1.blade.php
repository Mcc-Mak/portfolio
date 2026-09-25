@use('Illuminate\Support\Facades\Vite')

@php
    $IMG_ICON = "https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp";
    $IMG_BG = "https://t3.ftcdn.net/jpg/02/70/97/22/360_F_270972208_0wCfv9Nv4pOWbMiHyyHW6uKrRc613NCu.jpg";
@endphp

<!DOCTYPE html>
<html>
    <head>
        <title>@yield('<head>.title.appName'): @yield('<head>.title.pageName')</title>
        <link rel="icon" type="image/x-icon" href="{{ $IMG_ICON }}">
        @yield('<head>.include')
    </head>
    <body @class([]) @style([
        'width:1900px;height:770px',
        'background-image:url(\'' . $IMG_BG . '\')',
        'background-size:cover',
        ])>
        @yield('<body>.topbar')
        @yield('<body>.content')
    </body>
</html>