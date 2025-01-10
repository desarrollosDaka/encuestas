<script setup>
import SideNavContent from './SideNavContent.vue';
import obtenerCookiesUsuario from '../composables/cookies'

const userName = obtenerCookiesUsuario().userName
const rolUser = obtenerCookiesUsuario().rol

</script>


<template>
    <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
            <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                <div class="sb-sidenav-menu">
                    <div class="nav">
                        <div style="width: 100%;">
                            <img src="../assets/img/logoDaka.png" class="img-fluid img-thumbnail mx-auto d-block"
                                alt="Logo Daka" style="width: 150px; height: 150px;">
                        </div>

                        <div class="sb-sidenav-menu-heading">Surveys - Form</div>
                        <a class="nav-link collapsed" href="#" data-bs-toggle="collapse"
                            data-bs-target="#collapseLayouts" aria-expanded="false" aria-controls="collapseLayouts">
                            <div class="sb-nav-link-icon"><i class="fas fa-columns"></i></div>
                            Crear
                            <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
                        </a>
                        <div class="collapse" id="collapseLayouts" aria-labelledby="headingOne"
                            data-bs-parent="#sidenavAccordion">
                            <nav class="sb-sidenav-menu-nested nav">
                                <router-link to="/mysurveys" class="nav-link">Encuestas y Formularios</router-link>
                            </nav>
                        </div>
                        <!-- PARA AGREGAR MAS OPCIONES
                        <a class="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapsePages"
                            aria-expanded="false" aria-controls="collapsePages">
                            <div class="sb-nav-link-icon"><i class="fas fa-book-open"></i></div>
                            Pages
                            <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
                        </a>
                        <div class="collapse" id="collapsePages" aria-labelledby="headingTwo"
                            data-bs-parent="#sidenavAccordion">
                            <nav class="sb-sidenav-menu-nested nav accordion" id="sidenavAccordionPages">
                                <a class="nav-link collapsed" href="#" data-bs-toggle="collapse"
                                    data-bs-target="#pagesCollapseAuth" aria-expanded="false"
                                    aria-controls="pagesCollapseAuth">
                                    Authentication
                                    <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
                                </a>
                                <div class="collapse" id="pagesCollapseAuth" aria-labelledby="headingOne"
                                    data-bs-parent="#sidenavAccordionPages">
                                    <nav class="sb-sidenav-menu-nested nav">
                                        <a class="nav-link" href="login.html">Login</a>
                                        <a class="nav-link" href="register.html">Register</a>
                                        <a class="nav-link" href="password.html">Forgot Password</a>
                                    </nav>
                                </div>
                                <a class="nav-link collapsed" href="#" data-bs-toggle="collapse"
                                    data-bs-target="#pagesCollapseError" aria-expanded="false"
                                    aria-controls="pagesCollapseError">
                                    Error
                                    <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
                                </a>
                                <div class="collapse" id="pagesCollapseError" aria-labelledby="headingOne"
                                    data-bs-parent="#sidenavAccordionPages">
                                    <nav class="sb-sidenav-menu-nested nav">
                                        <a class="nav-link" href="401.html">401 Page</a>
                                        <a class="nav-link" href="404.html">404 Page</a>
                                        <a class="nav-link" href="500.html">500 Page</a>
                                    </nav>
                                </div>
                            </nav>
                        </div> -->
                        <div v-if="rolUser" class="sb-sidenav-menu-heading">Administración</div>

                        <router-link v-if="rolUser" to="/createUsers" class="nav-link">
                            <div class="sb-nav-link-icon"><i class="fa-solid fa-user-plus"></i></div>Usuarios
                        </router-link>

                        <!-- 
                        CREAR MAS OPCIONES
                        <a class="nav-link" href="charts.html">
                            <div class="sb-nav-link-icon"><i class="fa-solid fa-user-plus"></i></div>
                            Crear Usuarios
                        </a> -->
                        <!-- <a class="nav-link" href="tables.html">
                            <div class="sb-nav-link-icon"><i class="fas fa-table"></i></div>
                            Tables
                        </a> -->
                    </div>
                </div>
                <div class="sb-sidenav-footer">
                    <div class="small">Logged in as:</div>
                    <div class="small text-lowercase"><i class="fa-solid fa-user-check" style="color: greenyellow;"></i>
                        {{ userName }} </div>
                </div>
            </nav>


        </div>


        <!-- LayoutSidenav -->
        <SideNavContent />

    </div>

</template>