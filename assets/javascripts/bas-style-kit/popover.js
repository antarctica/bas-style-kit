import Popover from "../bootstrap-bsk/popover"

const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
const popoverList = [...popoverTriggerList].map(
    popoverTriggerEl => new Popover(popoverTriggerEl,{
        template:
            '<div class="popover bs-popover-auto" role="tooltip">' +
            '<div class="popover-arrow"></div>' +
            '<h3 class="popover-header"></h3>' +
            '<div class="popover-body"></div>' +
            '</div>'
            }
        )
    )