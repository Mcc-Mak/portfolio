<!DOCTYPE html>
<html lang="en">

<head>
    <title>Welcome</title>

    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link href="/lib/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script src="/lib/bootstrap/dist/js/bootstrap.bundle.min.js"></script>

    <link href="/lib/tabulator/dist/css/tabulator.min.css" rel="stylesheet">
    <script src="/lib/tabulator/dist/js/tabulator.min.js"></script>

    <link rel="stylesheet" href="/css/index.css">
</head>

<body>
    <div class="container-main">
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="container-fluid">
                <a class="navbar-brand" href="/index">
                    <img src="/image/bootstrap-logo.svg" width="30" height="30" class="d-inline-block align-top" alt="bootstrap-logo">
                    Bootstrap
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownBooking" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Booking Appointment
                            </a>
                            <ul class="dropdown-menu" aria-labelledby="navbarDropdownBooking">
                                <li><a class="dropdown-item" href="/api/booking/query">Query booking</a></li>
                                <li><a class="dropdown-item" href="#">Make booking</a></li>
                                <li><a class="dropdown-item" href="#">Cancel booking</a></li>
                            </ul>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownUser" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                User Management
                            </a>
                            <ul class="dropdown-menu" aria-labelledby="navbarDropdownUser">
                                <li><a class="dropdown-item" href="#">Change password</a></li>
                                <li><hr class="dropdown-divider"></li>
                                <li><a class="dropdown-item" href="#">Add user</a></li>
                                <li><a class="dropdown-item" href="#">Delete user</a></li>
                            </ul>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownConfig" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Configuration
                            </a>
                            <ul class="dropdown-menu" aria-labelledby="navbarDropdownConfig">
                                <li><a class="dropdown-item" href="#">Parameters</a></li>
                            </ul>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownReport" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Report
                            </a>
                            <ul class="dropdown-menu" aria-labelledby="navbarDropdownReport">
                                <li><a class="dropdown-item" href="#">Audit log</a></li>
                                <li><hr class="dropdown-divider"></li>
                                <li><a class="dropdown-item" href="#">Booking Summary</a></li>
                            </ul>
                        </li>
                    </ul>
                    <form>
                        <label for="LoggedIn-Role" class="page-name">${pageName}</label>
                        <div class="input-group">
                            <span class="input-group-text">Role</span>
                            <input type="text" id="LoggedIn-Role" aria-label="Role" class="form-control" value="user" disabled>
                        </div>
                        <div class="input-group">
                            <span class="input-group-text">Username</span>
                            <input type="text" id="LoggedIn-Username" aria-label="Username" class="form-control" value="user" disabled>
                        </div>
                    </form>
                </div>
            </div>
        </nav>
        <br>
        <br>
        <h2>Welcome to booking appointment system!</h2>
    </div>
</body>

</html>
