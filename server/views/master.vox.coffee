<?
app= global.app
theme=app.theme
?>

<!DOCTYPE html>
<html>
    <head>
        <meta charset='utf8'/>
        <title>{{vox.section('title') or "ICEVW"}}</title>

        <link rel="stylesheet" href="{{theme.asseturl('vox/css/all.css')}}"/>
        <link rel="stylesheet" href="{{theme.asseturl('css/estilo.css')}}"/>
        {{vox.section('headers', pars)}}

        <script src="{{theme.asseturl('js/empty.js')}}"></script>
        <script src="{{theme.asseturl('js/eventemitter.js')}}"></script>
        <script src="{{theme.asseturl('vox/js/jquery-2.1.4.min.js')}}"></script>
        <script src="{{theme.asseturl('vox/js/vox.js')}}"></script>
        <script src="{{theme.asseturl('vox/js/jf.platform.js')}}"></script>
        <script src="{{theme.asseturl('vox/js/jf.vox.js')}}"></script>
        <script src="{{theme.asseturl('vox/js/vox.toast.js')}}"></script>
        <script src="{{theme.asseturl('vox/js/vox.tabs.js')}}"></script>
        <script src="{{theme.asseturl('vox/js/vox.tooltip.js')}}"></script>
        <script src="{{theme.asseturl('vox/js/vox.modal.js')}}"></script>
        <script src="{{theme.asseturl('vox/js/vox.dropdown.js')}}"></script>
        <script src="{{theme.asseturl('vox/js/vox.sidenav.js')}}"></script>
        <script src="{{theme.asseturl('vox/js/vox.scrollfire.js')}}"></script>
        <script src="{{theme.asseturl('vox/js/vox.input.js')}}"></script>
        <script src="{{theme.asseturl('vox/js/vox.pinned.js')}}"></script>
        <script src="{{theme.asseturl('vox/js/vox.media.js')}}"></script>
        <script src="{{theme.asseturl('js/nw-comunication.js')}}"></script>
        {{theme.section('plataforma/scripts', req, res, pars)}}


        {{vox.section('scripts', pars)}}

    </head>

    <body class='transitioned'>
        {{vox.section('content', pars)}}
    </body>
</html>

<?
if(not res.async)
    res.end()
?>
