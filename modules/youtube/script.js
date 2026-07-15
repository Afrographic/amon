// Activation et desactivation de la side bar
let side_bar = document.querySelector("#side_bar")
function open_side_bar(){
    side_bar.classList.remove("side_bar_inactive");
}

function close_side_bar(){
    side_bar.classList.add("side_bar_inactive");
}

// Activation et desactivation des notifications
let notification_wrapper = document.querySelector("#notification_wrapper");
let notif_overflow = document.querySelector("#notif_overflow");

function open_notif(){
    notification_wrapper.classList.remove("notification_wrapper_inactive");
    notif_overflow.classList.remove("overflow_inactive");
}

function close_notif(){
    notification_wrapper.classList.add("notification_wrapper_inactive");
    notif_overflow.classList.add("overflow_inactive");
}

// Activation desactivation du profile
let profile_overflow = document.querySelector("#profile_overflow");
let profile_wrapper = document.querySelector("#profile_wrapper");

function open_profile(){
    profile_overflow.classList.remove("overflow_inactive");
    profile_wrapper.classList.remove("profile_wrapper_inactive");
}

function close_profile(){
    profile_overflow.classList.add("overflow_inactive");
    profile_wrapper.classList.add("profile_wrapper_inactive");
}

// Activation desaction du menu de video
let menu_video_overflow = document.querySelector("#menu_video_overflow");
let menu_video = document.querySelector("#menu_video");

function open_video_menu(){
    menu_video_overflow.classList.remove("overflow_inactive");
    menu_video.classList.remove("menu_video_inactive");
}
function close_video_menu(){
    menu_video_overflow.classList.add("overflow_inactive");
    menu_video.classList.add("menu_video_inactive");
}

//Activation desactivation du menu en bas de la video
let bottom_video_overflow = document.querySelector("#bottom_video_overflow");
let bottom_video_menu = document.querySelector("#bottom_video_menu");

function open_bottom_video_menu(){
    bottom_video_overflow.classList.remove("bottom_video_overflow_inactive");
    bottom_video_menu.classList.remove("bottom_video_menu_inactive");
}
function close_bottom_video_menu(){
    bottom_video_overflow.classList.add("bottom_video_overflow_inactive");
    bottom_video_menu.classList.add("bottom_video_menu_inactive");
}

//Toggle mobile search
let header = document.querySelector("#header");
let header_search = document.querySelector("#header_search");

function open_search_mobile(){
    header.classList.add("header_inactive");
    header_search.classList.remove("header_search_inactive");
}
function close_search_mobile(){
    header.classList.remove("header_inactive");
    header_search.classList.add("header_search_inactive");
}