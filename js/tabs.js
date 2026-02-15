tab_menu_btn = document.getElementById("tab-menu-btn");
tab_desc_btn = document.getElementById("tab-desc-btn");
tab_tabl_btn = document.getElementById("tab-tabl-btn");
tab_diag_btn = document.getElementById("tab-diag-btn");
tab_exec_btn = document.getElementById("tab-exec-btn");
tab_btns = [
    tab_menu_btn,
    tab_desc_btn,
    tab_tabl_btn,
    tab_diag_btn,
    tab_exec_btn,
];

tab_menu_win = document.getElementById("tab-menu-win");
tab_desc_win = document.getElementById("tab-desc-win");
tab_tabl_win = document.getElementById("tab-tabl-win");
tab_diag_win = document.getElementById("tab-diag-win");
tab_exec_win = document.getElementById("tab-exec-win");
tab_wins = [
    tab_menu_win,
    tab_desc_win,
    tab_tabl_win,
    tab_diag_win,
    tab_exec_win,
];

function tab_clear(tab_windows, tab_buttons) {
    for (const win of tab_windows) {
        win.classList.remove("tab-show");
    }
    for (const btn of tab_buttons) {
        btn.classList.remove("tab-show");
    }
}

function tab_show(tab_window, tab_button) {
    tab_window.classList.add("tab-show");
    tab_button.classList.add("tab-show");
}

tab_menu_btn.addEventListener("click", () => {
    tab_clear(tab_wins, tab_btns);
    tab_show(tab_menu_win, tab_menu_btn);
});

tab_desc_btn.addEventListener("click", () => {
    tab_clear(tab_wins, tab_btns);
    tab_show(tab_desc_win, tab_desc_btn);
});

tab_tabl_btn.addEventListener("click", () => {
    tab_clear(tab_wins, tab_btns);
    tab_show(tab_tabl_win, tab_tabl_btn);
});

tab_diag_btn.addEventListener("click", () => {
    tab_clear(tab_wins, tab_btns);
    tab_show(tab_diag_win, tab_diag_btn);
});

tab_exec_btn.addEventListener("click", () => {
    tab_clear(tab_wins, tab_btns);
    tab_show(tab_exec_win, tab_exec_btn);
});
