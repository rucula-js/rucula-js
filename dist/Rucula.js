({
    RESET_BACKGROUND: "reset-background",
    RESET_BACKGROUND_EVENT: new Event("reset-background"),
    BEFORE_SEND_OBJECT_HTTP: "before-send-object-http",
    EVENT_BEFORE_SEND_OBJECT_HTTP: new Event("before-send-object-http"),
    AFTER_SEND_OBJECT_HTTP: "after-send-object-http",
    EVENT_AFTER_SEND_OBJECT_HTTP: new Event("after-send-object-http"),
    SEND_OBJECT_HTTP_OK: "send-object-http-ok",
    EVENT_SEND_OBJECT_HTTP_OK: new Event("send-object-http-ok"),
    SEND_OBJECT_HTTP_ERROR: "send-object-http-error",
    EVENT_SEND_OBJECT_HTTP_ERROR: new Event("send-object-http-error")
});
const constPrefixEventField = {
    BEFORE: 'before',
    INPUT: 'input',
    AFTER: 'after',
};
const constTypeInput = {
    TEXT: "text",
    NUMBER: "number",
    BOOLEAN: "bool",
    DATE: "date",
    CURRENCY: "currency",
    SELECT: "select",
    CHECKBOX: "checkbox",
    TEXT_AREA: "textarea",
    RADIO: "radio",
    PASS: "password"
};
const constGroupFormat = {
    DOWN: "down",
    LEFT: "left",
    RIGTH: "right"
};
const constTypeFrame = {
    BLOCK: "block",
    LINE: "line"
};
const constIdBaseWindow = {
    NEW: "r-a-new",
    RELOAD: "r-a-reload",
    ERASE_WINDOW: "erase-window",
    ALTER_THEME: "alter-theme",
    MAXIMIZE_WINDOW: "maximize-window",
    ACTIONS_WINDOW: "r-actiond-window",
    GLOBALIZATION: "r-globalization",
    OLLI_GLOBALIZATION: "r-globalization-list",
    ENVIROMENT: "r-enviroment",
    OLLI_ENVIROMENT: "r-enviroment-list",
    FORM_RUCULA_JS: "form-rucula-js",
    BUTTONS_MENU_VERTICAL: "r-a-menu-vertical",
    BUTTONS_MENU_VERTICAL_MOBILE: "r-a-menu-vertical-mobile",
    BUTTONS_MENU_VERTICAL_LIST: "r-a-menu-vertical-list",
    TITLE: "r-window-title"
};
const contextMenu = {
    INPUT: 'context-menu-input'
};
const constAttrInput = {
    ATTR_TYPE: "ruc-type"
};
const constTargetButtonCrudDefault = {
    SAVE: "r-a-save",
    ALTER: "r-a-alter",
    DELETE: "r-a-delete"
};
const constInputClass = {
    FOCUS_IN_INPUT_WITH_DEPENDENCY: 'r-i-focus-dependency'
};
const constFrameLineActions = {
    ADD: 'f-l-action-add',
    REMOVE: 'f-l-action-remove'
};
const constYesNo = {
    NO: false,
    YES: true
};
const constPagination = {
    ROW_NUMBER: "r-pagination-row-number",
    FIND: "r-find",
    FIRST: "r-pagination-first",
    LAST: "r-pagination-last",
    PREVIOUS: "r-pagination-previous",
    NEXT: "r-pagination-next"
};

function convertValueType(value, type) {
    type = GetType(type);
    if (isBoolean()) {
        return convertToBoolean();
    }
    if (isNumeric()) {
        return convertToNumeric();
    }
    return value;
    function isNumeric() {
        return type == constTypeInput.CURRENCY ||
            type == constTypeInput.NUMBER;
    }
    function isBoolean() {
        return type == constTypeInput.BOOLEAN;
    }
    function convertToNumeric() {
        return Number(value);
    }
    function convertToBoolean() {
        if (value == "true") {
            return true;
        }
        else {
            return false;
        }
    }
    function GetType(type) {
        if (type.length == 2) {
            return type[1];
        }
        return type;
    }
}
function alignItem(field, item) {
    if (field.type == constTypeInput.TEXT || field.type == undefined || field.type[0] == constTypeInput.SELECT) {
        item.classList.add('r-t-align-left');
    }
    if (field.type == constTypeInput.NUMBER || field.type == constTypeInput.CURRENCY) {
        item.classList.add('r-t-align-right');
    }
    if (field.type[0] == constTypeInput.CHECKBOX) {
        item.classList.add('r-t-align-center');
    }
}

let cookie = (() => {
    return {
        read: function (name) {
            var cookies = document.cookie.split('; ');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = cookies[i].split('=');
                if (cookie[0] === name) {
                    return decodeURIComponent(cookie[1]);
                }
            }
            return null;
        }
    };
})();

let menuContext = (() => {
    let menusContext = [];
    let elemetInFocu;
    function createMenuContext(id) {
        let div = document.createElement('div');
        div.classList.add('context-menu');
        div.setAttribute('id', id);
        let ol = document.createElement('ol');
        div.appendChild(ol);
        menusContext.push({ id: id, element: div });
        return div;
    }
    function findMenu(id) {
        let menu = menusContext.find(c => c.id == contextMenu.INPUT);
        return menu.element;
    }
    function addItem(idMenuContext, buttonConfig) {
        let menu = findMenu().querySelector('ol');
        var li = document.createElement('li');
        var button = document.createElement('button');
        button.classList.add('r-b-i');
        button.setAttribute('id', buttonConfig.target);
        button.textContent = buttonConfig.text;
        li.appendChild(button);
        menu.appendChild(li);
    }
    function menuContextInput() {
        let detailsInput = {
            target: 'input-check-details',
            text: 'detalhe do campo',
            type: 'button',
        };
        let menu = createMenuContext(contextMenu.INPUT);
        addItem(contextMenu.INPUT, detailsInput);
        return menu;
    }
    return {
        init: function () {
            let menuInput = menuContextInput();
            let rw = document.querySelector('.r-w');
            rw?.appendChild(menuInput);
            rw?.addEventListener('contextmenu', (event) => {
                event.preventDefault();
                let target = event.target;
                elemetInFocu = target;
                if (target.classList.contains('r-q-b') || target.classList.contains('r-q-l')) {
                    return;
                }
                if (target.classList.contains('r-head')) ;
                if (target.classList.contains('r-vertical-actions')) ;
                if (target.nodeName == 'INPUT' || target.nodeName == 'SELECT' || target.nodeName == 'TEXTAREA') {
                    let menuActions = findMenu();
                    menuActions.style.display = 'block';
                    menuActions.style.left = `${event.pageX}px`;
                    menuActions.style.top = `${event.pageY}px`;
                }
            });
            document.addEventListener('click', function (event) {
                if (event.button !== 2) {
                    let menuInput = findMenu();
                    menuInput.style.display = 'none';
                }
            });
        },
        elemetInFocu: function () {
            return elemetInFocu;
        }
    };
})();

let popup = (() => {
    let boxShow;
    function boxShowAppendChield(element) {
        boxShow = document.querySelector('.r-box-show');
        boxShow.appendChild(element);
        boxShow.classList.add('r-box-show-center');
    }
    function messageElement(config) {
        let message = document.createElement('div');
        message.classList.add('r-message');
        message.innerHTML = `
            <div class="r-message-header">
                <div class="r-message-header-icon">
                    <i class="bi ${config.icon}"></i>
                </div>   
                <div class="r-message-header-title">
                    ${config.title}
                </div>
            </div>
            
            <div class="r-message-content">
                <div class="r-message-content-text">
                    ${config.text}
                </div>
            </div>
            <div class="r-message-footer">
                ${config.footer}
            </div>`;
        if (config?.disableadHeader) {
            let header = message.querySelector('.r-message-header');
            header?.remove();
        }
        if (config?.disableadFooter) {
            let footer = message.querySelector('.r-message-footer');
            footer?.remove();
        }
        if (config?.htmlBody) {
            let messageContent = message.querySelector('.r-message-content');
            messageContent?.appendChild(config?.htmlBody);
        }
        return message;
    }
    function closeTimeout(div, timeout, callback) {
        setTimeout(() => {
            div.remove();
            close();
            if (callback) {
                callback();
            }
        }, timeout);
    }
    function closeOKOrCancel(callback, div) {
        let ok = div.querySelector('button.ok');
        let cancel = div.querySelector('button.cancel');
        ok?.addEventListener('click', () => {
            div.remove();
            close();
            if (callback) {
                callback(constYesNo.YES);
            }
        });
        cancel?.addEventListener('click', () => {
            div.remove();
            close();
            if (callback) {
                callback(constYesNo.NO);
            }
        });
    }
    function close() {
        boxShow.classList.remove('r-box-show-center');
    }
    return {
        messsage: {
            info: function (config, callback) {
                let info = messageElement({
                    icon: "bi-info-circle color-darkgrey",
                    title: "Informação",
                    text: config.text,
                    footer: `<div class="r-message-footer">
                        <div class="cancel-ok">
                            <button class="ok">OK</button>        
                        </div>
                    </div>`,
                    disableadFooter: config.disableadFooter,
                    disableadHeader: config.disableadHeader,
                    htmlBody: config.htmlBody
                });
                if (config?.timeout) {
                    closeTimeout(info, config.timeout, callback);
                }
                closeOKOrCancel(callback, info);
                boxShowAppendChield(info);
            },
            sucess: function (config, callback) {
                let sucess = messageElement({
                    icon: "bi-check2-circle color-green",
                    title: "Sucesso",
                    text: config.text,
                    footer: `<div class="r-message-footer">
                        <div class="cancel-ok">
                            <button class="ok">OK</button>        
                        </div>
                    </div>`,
                    disableadFooter: config.disableadFooter
                });
                closeOKOrCancel(callback, sucess);
                if (config.timeout) {
                    closeTimeout(sucess, config.timeout);
                }
                boxShowAppendChield(sucess);
            },
            warning: function (config, callback) {
                let warning = messageElement({
                    icon: "bi-exclamation-triangle color-orange",
                    title: "Atenção",
                    text: config.text,
                    footer: `<div class="r-message-footer">
                        <div class="cancel-ok">
                            <button class="ok">OK</button>
                            <button class="cancel">Cancel</button>
                        </div>    
                    </div>`,
                    disableadFooter: config.disableadFooter
                });
                closeOKOrCancel(callback, warning);
                if (config.timeout) {
                    closeTimeout(warning, config.timeout);
                }
                boxShowAppendChield(warning);
            },
            error: function (config, callback) {
                let warning = messageElement({
                    icon: "bi-x-circle color-red",
                    title: "Erro",
                    text: config.text,
                    footer: `<div class="r-message-footer">
                        <div class="cancel-ok">
                            <button class="ok">OK</button>        
                        </div>    
                    </div>`,
                    disableadFooter: config.disableadFooter
                });
                closeOKOrCancel(callback, warning);
                if (config.timeout) {
                    closeTimeout(warning, config.timeout);
                }
                boxShowAppendChield(warning);
            },
        },
        notify: {
            sucess: function () {
            }
        }
    };
})();

let fieldMenuContext = (() => {
    let fieldsInfo = [];
    let lastDetail;
    return {
        init: function () {
            let menuOInput = document.getElementById(contextMenu.INPUT);
            menuOInput?.addEventListener('click', () => {
                if (lastDetail) {
                    lastDetail.remove();
                }
                let ol = document.createElement('ol');
                lastDetail = ol;
                let identity = menuContext.elemetInFocu().getAttribute('identity');
                let field = fieldMenuContext.info.get(identity)?.field;
                let details = `  
                <table>
                    <tr>
                        <td>Descrição</td>
                        <td>${field?.description ?? ''}</td>
                    </tr>
                    <tr>
                        <td>Propriedade</td>
                        <td>${field?.propertDto}</td>
                    </tr>
                    <tr>
                        <td>Obrigatório</td>
                        <td><input type="checkbox" ${(field?.requerid ?? false) == true ? 'checked' : ''} disabled/></td>
                    </tr>
                    <tr>
                        <td>Desabilitado</td>
                        <td><input type="checkbox" ${(field?.disable ?? false) == true ? 'checked' : ''} disabled/></td>
                    </tr>
                    <tr>
                        <td>Máximo</td>
                        <td>${field?.max ?? 0}</td>
                    </tr>
                    <tr>
                        <td>Minimo</td>
                        <td>${field?.min ?? 0}</td>
                    </tr>
                    <tr>
                        <td>Comprimento</td>
                        <td>${field?.maxLength ?? 0}</td>
                    </tr>
                    <tr>
                        <td>Informação</td>
                        <td>${field?.information ?? ''}</td>
                    </tr>
              </table>
            `;
                ol.innerHTML = details;
                popup.messsage.info({
                    text: 'Detalhamento',
                    htmlBody: ol
                });
            });
        },
        info: {
            set: function (fieldInfo) {
                fieldsInfo.push(fieldInfo);
            },
            get: function (identity) {
                return fieldsInfo.find(c => c.identity == identity);
            }
        }
    };
})();

let windowBaseDOM = (() => {
    let elementRoot;
    function createWindowBase(id) {
        const ruculaWindow = document.createElement("div");
        ruculaWindow.classList.add("r-w");
        const actions = document.createElement("div");
        actions.className = "r-left-block";
        actions.innerHTML = componentActions();
        ruculaWindow.appendChild(actions);
        const contentForm = document.createElement("div");
        contentForm.innerHTML = createComponentCreateOrEdit();
        ruculaWindow.appendChild(contentForm.childNodes[0]);
        ruculaWindow.appendChild(contentForm.childNodes[1]);
        const div = document.getElementById(id);
        div?.appendChild(ruculaWindow);
        calculateHeightRuculaWindow();
        prepareEventsButtonsCrud();
        maximizeWindow();
        eraseWindow();
        alterTheme();
        openActionswindow();
        menuContext.init();
        fieldMenuContext.init();
        function calculateHeightRuculaWindow() {
            let offsetTop = Number(ruculaWindow.offsetTop);
            let height = Number(window.innerHeight);
            ruculaWindow.style.height = `${height - offsetTop}px`;
        }
    }
    function createNameWindow(name) {
        let window = document.querySelector(".r-w-t");
        window.innerHTML = name;
    }
    function componentActions() {
        const ACTIONS = `<div class="r-act" id="actions">
                <div class="r-act-opt r-head" id="w-title">
                    <button id="${constIdBaseWindow.NEW}" class="r-a-b r-btn-new-cancel-close"><i class="bi bi-plus-lg"></i></button>
                    <div class="r-w-t">
                    </div>
                    <button id="r-a-many" class="r-a-b"><i class="bi bi-list"></i></button>
                </div>
                <div class="r-left-block-grid" id="w-grid">
                    <form class="searh-items-grid" id="${constPagination.FIND}" autocomplete=off>
                        <input name="r-find-value" type="text"/>
                        <button><i class="bi bi-search"></i></button>
                    </form>
                    <div class="r-act-grid-body">
                    </div>
                    <div class="r-act-grid-footer" id="r-act-grid-footer">
                        <div>
                            <span>N. Linha</span>
                            <select id="${constPagination.ROW_NUMBER}" name="len-page">
                                <option value="10">10</option>
                                <option value="25">25</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                                <option value="1000">1000</option>
                            </select>
                        </div>
                         <div>
                            <button id="${constPagination.FIRST}" class="r-a-b"><i class="bi bi-arrow-up"></i></button>
                            <button id="${constPagination.LAST}" class="r-a-b"><i class="bi bi-arrow-down"></i></button>
                            <button id="${constPagination.PREVIOUS}" class="r-a-b"><i class="bi bi-arrow-left"></i></button>
                            <button id="${constPagination.NEXT}" class="r-a-b"><i class="bi bi-arrow-right"></i></button>
                        </div>
                    </div>
                </div>
             </div>`;
        return ACTIONS;
    }
    function createComponentCreateOrEdit() {
        const CREATE_OR_EDIT = `<div class="container-r-f  js-open-close-container">
            <div class="r-act-opt r-head" id="w-title">
            </div>
            <div class="r-f-items r-f-home">
                <div class="r-f-home-round">
                    <i id="r-f-home-icon"class="bi" ></i>
                </div>
                <h3 id="r-f-home-title"></h3>
            </div>
        </div>
        <div autocomplete="off" class="r-f container-r-f r-display-none js-open-close-container">
           
        <div class="r-facede-action top">
            <div class="r-window-name r-facede-action top">
                <h3 class="${constIdBaseWindow.TITLE}"></h3>
            </div>
            <div class="r-head r-read-new r-facede-action top">
               
                <div style="z-index: 10; width: 100%;">
                    <button id="${constIdBaseWindow.ACTIONS_WINDOW}" class="r-a-b r-actions-window"><i class="bi bi-nut"></i></button>
                    <div class="r-display-inline-block r-actions-window r-actions-window-itens">
                        <div class="r-display-inline-block">
                            <button id="${constIdBaseWindow.MAXIMIZE_WINDOW}" class="r-a-b"><i class="bi bi-arrows"></i></button>
                            <button id="${constIdBaseWindow.RELOAD}" class="r-a-b "><i class="bi bi-arrow-repeat"></i></button>
                            <button id="${constIdBaseWindow.ERASE_WINDOW}" class="r-a-b "><i class="bi bi-eraser"></i></button>
                            <button id="${constIdBaseWindow.ALTER_THEME}" class="r-a-b "><i class="bi bi-circle-half"></i></button>
                        </div>
                        <div class="actions-view">
                            <button id="${constIdBaseWindow.GLOBALIZATION}" class="r-a-b">
                                <i class="bi bi-globe-americas"></i>
                                <ol id="${constIdBaseWindow.OLLI_GLOBALIZATION}" class="${constIdBaseWindow.OLLI_GLOBALIZATION} list-vertical-buttons list-vertical-buttons-pp-left r-display-none">
                                </ol>                        
                            </button> 
                            <button id="${constIdBaseWindow.ENVIROMENT}" class="r-a-b">
                                <i class="bi bi-fire"></i>
                                <ol id="${constIdBaseWindow.OLLI_ENVIROMENT}" class="${constIdBaseWindow.OLLI_ENVIROMENT} list-vertical-buttons list-vertical-buttons-pp-left r-display-none">
                                </ol>                        
                            </button>    
                        </div>
                    </div>
                </div>
                <div class="r-head r-read-edit">
                    <button id="r-a-save" class="r-a-b "><i class="bi bi-box-arrow-in-down"></i></button>
                    <button id="r-a-alter" class="r-a-b"><i class="bi bi-pen"></i></button>
                    <button id="r-a-delete" class="r-a-b"><i class="bi bi-trash"></i></button>    
                    <button id=${constIdBaseWindow.BUTTONS_MENU_VERTICAL} class="r-a-b"><i class="bi bi-arrows"></i></button>    
                </div>
                </div>
            </div>

            <div class="r-w-body">
                <form class="r-f-items" id="${constIdBaseWindow.FORM_RUCULA_JS}" autocomplete="off">
                </form>
                <div class="r-vertical-actions">
                    <ol id=${constIdBaseWindow.BUTTONS_MENU_VERTICAL_LIST} class=""> 
                    </ol>
                    <button id=${constIdBaseWindow.BUTTONS_MENU_VERTICAL_MOBILE} class="r-a-b actions-mobile"><i class="bi bi-arrows"></i></button>    
                </div>
            </div>
            <div class="r-facede-action bottom">
            </div>
            <div class="r-box-show" id="r-box-show"> 
            </div>
        </div>
        `;
        return CREATE_OR_EDIT;
    }
    function prepareEventsButtonsCrud() {
        let rNew = document.getElementById(constIdBaseWindow.NEW);
        rNew.addEventListener("click", () => {
            openCloseContainer();
            rNew.classList.toggle("r-btn-new-convert-close");
            rNew.classList.toggle("r-btn-new-cancel-close");
        });
    }
    function openCloseContainer() {
        let itemContainer = document.querySelectorAll(".js-open-close-container");
        itemContainer.forEach(item => {
            item.classList.toggle("r-display-none");
        });
    }
    function closeLeftGrid(grid) {
        if (grid == false) {
            let buttonNew = document.getElementById(constIdBaseWindow.NEW);
            buttonNew?.click();
            let actions = document.getElementById("actions");
            actions?.remove();
            let maximizeWindow = document.getElementById(constIdBaseWindow.MAXIMIZE_WINDOW);
            maximizeWindow?.remove();
        }
    }
    function maximizeWindow() {
        let maximize = document.getElementById(constIdBaseWindow.MAXIMIZE_WINDOW);
        maximize?.addEventListener('click', () => {
            let actions = document.getElementById("actions");
            actions?.classList.toggle("r-close-grid");
        });
    }
    function eraseWindow() {
        let erase = document.getElementById(constIdBaseWindow.ERASE_WINDOW);
        let form = windowBaseDOM.getPrincipalElementRucula();
        erase?.addEventListener('click', () => {
            form.reset();
        });
    }
    function openActionswindow() {
        let actions = document.getElementById(constIdBaseWindow.ACTIONS_WINDOW);
        actions?.addEventListener('click', (e) => {
            actions?.nextElementSibling?.classList.toggle('r-actions-window-active');
            actions?.nextElementSibling?.classList.toggle('r-actions-window');
        });
    }
    function alterTheme() {
        let rw = document.querySelector('.r-w');
        let actions = document.getElementById(constIdBaseWindow.ALTER_THEME);
        let theme = cookie.read('theme');
        if (theme == 'dark') {
            rw?.classList.add('dark-theme');
        }
        actions?.addEventListener('click', (e) => {
            rw?.classList.toggle('dark-theme');
            if (rw?.classList.contains('dark-theme')) {
                document.cookie = "theme=dark";
            }
            else {
                document.cookie = "theme=light";
            }
        });
    }
    return {
        createWindowBase: (id) => {
            createWindowBase(id);
        },
        createNameWindow: (name) => {
            createNameWindow(name);
        },
        setElementRoot: (id) => {
            elementRoot = document.getElementById(id);
        },
        getElementRoot: () => {
            return elementRoot;
        },
        getPrincipalElementRucula: () => {
            return document.getElementById(constIdBaseWindow.FORM_RUCULA_JS);
        },
        closeLeftGrid: (grid) => closeLeftGrid(grid)
    };
})();

let paginationEvents = (function () {
    return {
        headerSearch: function (gridSearch) {
            let search = document.getElementById(constPagination.FIND);
            if (gridSearch == false) {
                search?.remove();
            }
            let elementRoot = windowBaseDOM.getElementRoot();
            let body = {
                detail: {
                    value: ''
                }
            };
            let event = new CustomEvent('r-pagination-find', body);
            search?.addEventListener('submit', (e) => {
                e.preventDefault();
                var formData = new FormData(e.target);
                body.detail.value = String(formData.get('r-find-value'));
                elementRoot.dispatchEvent(event);
            });
        },
        fotter: function (gridFooter) {
            if (gridFooter == false) {
                document.getElementById('r-act-grid-footer')?.remove();
            }
            let elementRoot = windowBaseDOM.getElementRoot();
            let pagination = {
                detail: {
                    page: ''
                }
            };
            let event = new CustomEvent('r-pagination', pagination);
            document.getElementById(constPagination.FIRST)?.addEventListener('click', () => dispatchEvent('first'));
            document.getElementById(constPagination.LAST)?.addEventListener('click', () => dispatchEvent('last'));
            document.getElementById(constPagination.PREVIOUS)?.addEventListener('click', () => dispatchEvent('previous'));
            document.getElementById(constPagination.NEXT)?.addEventListener('click', () => dispatchEvent('next'));
            function dispatchEvent(page) {
                pagination.detail.page = page;
                elementRoot.dispatchEvent(event);
            }
            let row = {
                detail: {
                    row: 0
                }
            };
            let eventRow = new CustomEvent('r-pagination-row', row);
            document.getElementById(constPagination.ROW_NUMBER)?.addEventListener('change', (e) => {
                var select = e.target;
                row.detail.row = Number(select.value);
                elementRoot.dispatchEvent(eventRow);
            });
        }
    };
});

let tableDependency = () => {
    let dependencyesNotResolved = [];
    let REQUERID = '1';
    let MAX_LENGHT = '2';
    let MAX = '3';
    let MIN = '4';
    function moveImbernateToNotResolved(identityObject) {
        let dependency = dependencyesNotResolved.find(c => c.identityObject == identityObject);
        if (dependency) {
            dependency.isHibernate = false;
        }
    }
    function moveNotResolvedToImbernate(identityObject) {
        let dependency = dependencyesNotResolved.find(c => c.identityObject == identityObject);
        if (dependency) {
            dependency.isHibernate = true;
        }
    }
    function createExpectedDependency(field, fragmentField) {
        let valueDependency = '';
        checkIsRequerid();
        checkMaxLength();
        checkMax();
        checkMin();
        function checkIsRequerid() {
            if (field.requerid)
                valueDependency += `${REQUERID},`;
        }
        function checkMaxLength() {
            if (field.maxLength > 0)
                valueDependency += `${MAX_LENGHT}:${field.maxLength},`;
        }
        function checkMax() {
            if (field.max > 0)
                valueDependency += `${MAX}:${field.max},`;
        }
        function checkMin() {
            if (field.min > 0)
                valueDependency += `${MIN}:${field.min},`;
        }
        valueDependency = removeLastComa(valueDependency);
        if (valueDependency) {
            let index = dependencyesNotResolved.findIndex(c => c.identityObject == fragmentField.config.fragmentObjectIdentity);
            if (index == -1) {
                let objectDependency = {
                    isHibernate: false,
                    identityObject: fragmentField.config.fragmentObjectIdentity,
                    fieldsNotResolved: [field.identity]
                };
                dependencyesNotResolved.push(objectDependency);
            }
            if (index != -1) {
                let indexDependency = dependencyesNotResolved[index].fieldsNotResolved.findIndex(c => c == field.identity);
                if (indexDependency == -1) {
                    dependencyesNotResolved[index].fieldsNotResolved.push(field.identity);
                }
            }
        }
        return valueDependency;
    }
    function toApplyOrRemoveDependency(fragment, value) {
        let dependencyExpected = fragment.config.dependency;
        let dependencyResolved = '';
        dependencyExpected
            .split(',')
            .forEach(expected => {
            let identification = expected.split(':')[0];
            if (identification == REQUERID) {
                let result = consist.requerid(value);
                if (result) {
                    dependencyResolved += `${REQUERID},`;
                }
            }
            if (identification == MAX_LENGHT) {
                let result = consist.maxLen(dependencyExpected, value);
                if (result) {
                    dependencyResolved += `${MAX_LENGHT},`;
                }
            }
            if (identification == MAX) {
                let result = consist.max(dependencyExpected, value);
                if (result) {
                    dependencyResolved += `${MAX},`;
                }
            }
            if (identification == MIN) {
                let result = consist.min(dependencyExpected, value);
                if (result) {
                    dependencyResolved += `${MIN},`;
                }
            }
        });
        dependencyResolved = removeLastComa(dependencyResolved);
        let dependencyExpectedOnlyKeys = dependencyExpected.split(',').map(c => c.split(':')[0]);
        let dependencyResolvedOnlyKeys = dependencyResolved.split(',').map(c => c.split(':')[0]);
        let existDependecy = false;
        for (let index = 0; index < dependencyExpectedOnlyKeys.length; index++) {
            let indexOf = dependencyResolvedOnlyKeys.indexOf(dependencyExpectedOnlyKeys[index]);
            if (indexOf == -1) {
                existDependecy = true;
                break;
            }
        }
        let dependencyObject = dependencyesNotResolved.find(objectDep => objectDep.identityObject == fragment.config.fragmentObjectIdentity);
        let dependency = dependencyObject?.fieldsNotResolved.find(dependency => dependency == fragment.key.identity);
        if (existDependecy == true && dependency == undefined) {
            dependencyObject?.fieldsNotResolved.push(fragment.key.identity);
        }
        if (existDependecy == false && dependency != undefined) {
            let index = dependencyObject?.fieldsNotResolved.indexOf(dependency);
            dependencyObject?.fieldsNotResolved.splice(index, 1);
        }
        return existDependecy;
    }
    function removeLastComa(value) {
        return value.replace(/, *$/, '');
    }
    let consist = (() => {
        function getValueInDependency(dependencyExpected) {
            return dependencyExpected.split(':')[1];
        }
        return {
            requerid: (value) => {
                if (value == undefined || value == 0) {
                    return false;
                }
                return true;
            },
            maxLen: (dependencyExpected, value) => {
                let maxLength = getValueInDependency(dependencyExpected);
                value = addValueDefault().typeString((value));
                if (value.length > Number(maxLength)) {
                    return false;
                }
                return true;
            },
            max: (dependencyExpected, value) => {
                let max = getValueInDependency(dependencyExpected);
                value = Number(addValueDefault().typeNumber((value)));
                if (Number.NaN == value) {
                    alert('value not is number');
                    return false;
                }
                if (value > Number(max)) {
                    return false;
                }
                return true;
            },
            min: (dependencyExpected, value) => {
                let max = getValueInDependency(dependencyExpected);
                value = Number(addValueDefault().typeNumber((value)));
                if (Number.NaN == value) {
                    alert('value not is number');
                    return false;
                }
                if (value < Number(max)) {
                    return false;
                }
                return true;
            }
        };
    })();
    function addValueDefault() {
        return {
            typeString: (value) => {
                if (value == undefined) {
                    return '';
                }
                return value;
            },
            typeNumber: (value) => {
                if (value == undefined) {
                    return 0;
                }
                return value;
            }
        };
    }
    return {
        removeExpectedDependency: (identity) => {
            let dependency = dependencyesNotResolved.find(c => c.fieldsNotResolved.indexOf(identity) > -1);
            if (dependency) {
                let index = dependency.fieldsNotResolved.indexOf(identity);
                if (index > -1) {
                    dependency.fieldsNotResolved.splice(index, 1);
                }
            }
        },
        createExpectedDependency: (field, fragmentField) => {
            return createExpectedDependency(field, fragmentField);
        },
        toApplyOrRemoveDependency: (fragment, value) => {
            return toApplyOrRemoveDependency(fragment, value);
        },
        getDependenciesNotResolded: () => {
            return dependencyesNotResolved;
        },
        dependenciesCount: () => {
            return dependencyesNotResolved
                .filter(c => c.fieldsNotResolved.length > 0).length;
        },
        moveImbernateToNotResolved: (identityObject) => moveImbernateToNotResolved(identityObject),
        moveNotResolvedToImbernate: (identityObject) => moveNotResolvedToImbernate(identityObject)
    };
};

let exportTableDependency = tableDependency();
let exportPaginationEvents = paginationEvents();

let fragment = (() => {
    let objects = new Array();
    let fields = new Array();
    function checkIdentity(identity) {
        if (identity === undefined) {
            throw new Error('identity is requerid');
        }
    }
    return {
        objects: {
            add: function (object) {
                checkIdentity(object.key.identity);
                let exist = objects.find(c => c.key.identity == object.key.identity);
                if (exist) {
                    throw new Error('Object identity exists!!!');
                }
                objects.push(object);
            },
            getForFieldIdentity: function (identity) {
                let field = fragment.fields.getForIdentity(identity);
                return fragment.objects.getForIdentity(field.config.fragmentObjectIdentity);
            },
            getForIdentity: function (identity) {
                if (identity === undefined) {
                    throw new Error('identity requerid!');
                }
                let object = objects.find(c => c.key.identity == identity);
                if (object) {
                    return object;
                }
                throw new Error("Object not Found");
            },
            getForAlias: function (alias) {
                if (alias === undefined) {
                    throw new Error('alias is requerid');
                }
                let object = objects.find((c) => c.key.alias == alias);
                if (object) {
                    return object;
                }
                throw new Error('object not found');
            }
        },
        fields: {
            add: function (field) {
                checkIdentity(field.key.identity);
                let exist = fields.find(c => c.key.identity == field.key.identity);
                if (exist) {
                    throw new Error('Field identity exists!!!');
                }
                fields.push(field);
            },
            remove: function (fragment) {
                let index = fields.indexOf(fragment);
                if (index > -1) {
                    fields.splice(index, 1);
                }
            },
            removeLine: function (objectIDentity, line) {
                let _fields = fields.filter(item => item.config.fragmentObjectIdentity == objectIDentity && item.config.line == line);
                _fields.forEach(field => {
                    let indexOf = fields.indexOf(field);
                    if (indexOf > -1) {
                        exportTableDependency.removeExpectedDependency(field.key.identity);
                        fields.splice(indexOf, 1);
                    }
                });
            },
            getForIdentity: function (identity) {
                if (identity === undefined) {
                    throw new Error('identity is requerid');
                }
                let field = fields.find(c => c.key.identity == identity);
                if (field) {
                    return field;
                }
                throw new Error("field not Found");
            },
            getForAliasAndPropert: function (config) {
                if (config === undefined) {
                    throw new Error('entityConfiguration is requerid');
                }
                return fields.find((c) => c.config.alias == config.aliasOrIDentity &&
                    c.config.propertDto == config.propertDto &&
                    c.config.line == config.line);
            }
        }
    };
})();

function generateUUID(sinal) {
    return `RUC${sinal}xxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx`.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

let managmentObject = (() => {
    let initialized = false;
    let pathObjectBase = [];
    function initObjects(frames) {
        if (initialized) {
            throw new Error('Routine already initialized');
        }
        initialized = true;
        frames?.forEach(frame => {
            frame.identity = generateUUID('F');
            if (frame.alias === undefined) {
                throw new Error('propert alias is Requerid');
            }
            let fragmentObject = {
                key: {
                    identity: frame.identity,
                    alias: frame.alias
                },
                config: {
                    objectDto: frame.objectDto,
                    identity: frame.identity,
                    object: frame.type == constTypeFrame.BLOCK ? {} : [],
                    getValueInObjectFragment: getValueInObjectFragment
                }
            };
            fragment.objects.add(fragmentObject);
            pathObjectBase.push({ parent: frame.parent, alias: frame.alias, configFrame: frame.identity });
        });
    }
    function configFieldBlock(frame) {
        frame.fields?.forEach(field => {
            field.identity = generateUUID('I');
            let config = {
                key: {
                    identity: field.identity,
                },
                config: {
                    alias: frame.alias,
                    fragmentObjectIdentity: frame.identity,
                    identity: field.identity,
                    propertDto: field.propertDto,
                    line: undefined,
                    dependency: ''
                }
            };
            config.config.dependency = exportTableDependency.createExpectedDependency(field, config);
            exportTableDependency.toApplyOrRemoveDependency(config, field.value);
            fragment.fields.add(config);
        });
    }
    function addLine(frame) {
        let object = fragment.objects.getForIdentity(frame.identity);
        let newLine = object.config.object.length + 1;
        object.config.object.push({ rucLine: newLine });
        frame.fields?.forEach(field => {
            field.identity = generateUUID('I');
            let config = {
                key: {
                    identity: field.identity,
                },
                config: {
                    alias: frame.alias,
                    fragmentObjectIdentity: frame.identity,
                    identity: field.identity,
                    propertDto: field.propertDto,
                    line: newLine,
                    dependency: ''
                }
            };
            config.config.dependency = exportTableDependency.createExpectedDependency(field, config);
            exportTableDependency.toApplyOrRemoveDependency(config, field.value);
            fragment.fields.add(config);
        });
    }
    function createObject() {
        let configBase = pathObjectBase.find(c => c.parent === undefined || c.parent === '');
        let configFrameBase = fragment.objects.getForIdentity(configBase.configFrame);
        let newObject = Object.assign({}, configFrameBase?.config.object);
        pathObjectBase.forEach((config) => {
            let fragmentObject = fragment.objects.getForIdentity(config.configFrame);
            if (config.parent == '.') {
                insertObjectRoot();
                return;
            }
            if (config.parent != '.' && config.parent !== undefined && config.parent !== '') {
                insertObjectParent(config.parent.split('.'), newObject);
                return;
            }
            function insertObjectRoot() {
                newObject[fragmentObject.config.objectDto] = fragmentObject.config.object;
            }
            function insertObjectParent(parent, newObject) {
                if (parent.length == 0) {
                    return;
                }
                let propert = parent[0];
                if (parent.length == 1) {
                    createPropertForObject();
                    return;
                }
                if (parent.length > 1) {
                    createPropertForPath();
                    let newPath = parent.slice(1, parent.length);
                    insertObjectParent(newPath, newObject[propert]);
                    return;
                }
                function createPropertForObject() {
                    if (newObject[propert] === undefined) {
                        newObject[propert] = {};
                    }
                    newObject[propert][fragmentObject.config.objectDto] = fragmentObject.config.object;
                }
                function createPropertForPath() {
                    if (newObject[propert] === undefined) {
                        newObject[propert] = {};
                    }
                }
            }
        });
        return newObject;
    }
    function createObjectSeparete() {
        let objectSeparate = {};
        pathObjectBase.forEach((config) => {
            let configFragment = fragment.objects.getForIdentity(config.configFrame);
            objectSeparate[config.alias] = configFragment.config.object;
        });
        return objectSeparate;
    }
    function createObjectForAlias(alias) {
        let object = fragment.objects.getForAlias(alias);
        return object.config.object;
    }
    function setValue(fragmentField, value) {
        let fragmentObject = fragment.objects.getForIdentity(fragmentField.config.fragmentObjectIdentity);
        if (isTypeObject()) {
            fragmentObject.config.object[fragmentField?.config.propertDto] = value;
        }
        if (isTypeLine()) {
            let line = fragmentField?.config.line;
            let item = fragmentObject.config.object.find((c) => c.rucLine == line);
            if (item == undefined) {
                item = { rucLine: line };
                fragmentObject.config.object.push(item);
            }
            item[fragmentField?.config.propertDto] = value;
        }
        function isTypeObject() {
            return fragmentField?.config.line == undefined;
        }
        function isTypeLine() {
            return fragmentField?.config.line != undefined;
        }
        exportTableDependency.toApplyOrRemoveDependency(fragmentField, value);
    }
    function createConfigurationField(config) {
        let opt = config.split('.');
        let entityConfiguration = {
            aliasOrIDentity: opt[0],
            propertDto: opt[1],
            line: opt[2] == undefined ? undefined : Number(opt[2])
        };
        return entityConfiguration;
    }
    function getValueInObjectFragment(object, propertDto, line) {
        for (var propert in object) {
            if (object.hasOwnProperty(propertDto) && line == undefined) {
                return object[propertDto];
            }
            if (Array.isArray(object) && line != undefined) {
                return getValueInObjectFragment(object[line], propertDto);
            }
            if (typeof object === 'object') {
                return getValueInObjectFragment(object[propert], propertDto);
            }
        }
    }
    return {
        frame: {
            initObjects: (frames) => initObjects(frames),
            configFieldBlock: (frame) => configFieldBlock(frame),
            addLine: (frame) => addLine(frame),
        },
        field: {
            type: (identityField) => {
                let fragmentField = fragment.fields.getForIdentity(identityField);
                if (fragmentField.config.line == undefined) {
                    return constTypeFrame.BLOCK;
                }
                return constTypeFrame.LINE;
            }
        },
        object: {
            field: {
                convertAliasToIdenty: (config) => {
                    let entityConfiguration = createConfigurationField(config);
                    let fragmentField = fragment.fields.getForAliasAndPropert(entityConfiguration);
                    return fragmentField.key.identity;
                },
                setValueContextAlias: (config, value) => {
                    let entityConfiguration = createConfigurationField(config);
                    let fragmentField = fragment.fields.getForAliasAndPropert(entityConfiguration);
                    setValue(fragmentField, value);
                },
                setValueContextIdentity: (identity, type, value) => {
                    value = convertValueType(value, type);
                    let fragmentField = fragment.fields.getForIdentity(identity);
                    setValue(fragmentField, value);
                },
            },
            object: {
                objectFull: () => {
                    return createObject();
                },
                objectSeparate: () => {
                    return createObjectSeparete();
                },
                objectUnique: (alias) => {
                    return createObjectForAlias(alias);
                },
                objectUniqueLine: (alias, line) => {
                    let object = createObjectForAlias(alias);
                    object = object[line];
                    return object;
                },
                count: (identity) => {
                    let object = fragment.objects.getForIdentity(identity);
                    if (Array.isArray(object.config.object) == false) {
                        return -1;
                    }
                    return object.config.object.length;
                },
                removeLine: (identity, line) => {
                    let objectFragment = fragment.objects.getForIdentity(identity);
                    var indexOf = objectFragment.config.object.findIndex((c) => c.rucLine == line);
                    objectFragment.config.object.splice(indexOf, 1);
                },
                getPropert: (config) => {
                    let entityConfiguration = createConfigurationField(config);
                    let fragmentField = fragment.fields.getForAliasAndPropert(entityConfiguration);
                    let fragmentObject = fragment.objects.getForIdentity(fragmentField.config.fragmentObjectIdentity);
                    let object = fragmentObject.config.object;
                    return fragmentObject.config.getValueInObjectFragment(object, entityConfiguration.propertDto, entityConfiguration.line);
                }
            }
        },
        fragment: {
            getFragmentForIdentity: (identity) => {
                return fragment.fields.getForIdentity(identity);
            },
            removeFragmentsLine: (objectIDentity, line) => {
                fragment.fields.removeLine(objectIDentity, line);
            },
            removeFragment: (identity) => {
                let _fragment = fragment.fields.getForIdentity(identity);
                fragment.fields.remove(_fragment);
                exportTableDependency.removeExpectedDependency(identity);
            }
        }
    };
})();

class ElementBase {
    element;
    addDataIdAttribute(button) {
        this.element.setAttribute("id", button.target);
    }
    addColor(color) {
        if (color)
            this.element.style.backgroundColor = color;
    }
}

function createIcon(button) {
    let icon = document.createElement('i');
    if (button.icon === undefined || button.icon.trim() === "")
        return icon;
    button.icon?.split(" ").forEach(item => icon.classList.add(item));
    return icon;
}

class ElementButton extends ElementBase {
    createElement(button) {
        if (button.target == null || button.target == "") {
            throw new Error("target is requerid!");
        }
        this.element = document.createElement('button');
        this.element.classList.add("r-b-i");
        this.element.setAttribute('type', 'button');
        if (button.fullWidth) {
            this.element.classList.add('r-button-full-width');
        }
        let _class = button?.class?.split(' ');
        _class?.forEach(item => {
            this.element.classList.add(item);
        });
        let icon = createIcon(button);
        let span = document.createElement('span');
        span.textContent = button.text ?? "";
        this.element.appendChild(icon);
        this.element.appendChild(span);
        this.addColor(button.color);
        this.addDataIdAttribute(button);
        return this.element;
    }
}

class ElementLink extends ElementBase {
    createElement(button) {
        this.element = document.createElement('a');
        this.element.textContent = button.text + "";
        this.element.href = `${button.link}`;
        this.element.classList.add("btn-link");
        this.element.setAttribute('target', "_blank");
        this.element.appendChild(createIcon(button));
        return this.element;
    }
}

let ruculaGlobal = (() => {
    let configuration;
    function checkLocalizations(localizations) {
        if (localizations.length == 0) {
            throw new Error("🌿 localization must be informed");
        }
    }
    function checkEnvironments(environments) {
        if (environments.length == 0) {
            throw new Error("🌿 environment must be informed");
        }
    }
    return {
        initGlobalConfiguration: function (config) {
            configuration = config;
            ruculaGlobal.setEnviroment();
            ruculaGlobal.setLocalization();
        },
        setLocalization: function (locales = 0) {
            checkLocalizations(configuration.localizations);
            if (typeof locales === "number") {
                configuration.chosenLocalization = configuration.localizations[0];
                return;
            }
            let loc = configuration.localizations.find(c => c.locales === locales);
            if (loc == undefined || loc == null) {
                throw new Error("🌿 localization not found");
            }
            configuration.chosenLocalization = loc;
        },
        setEnviroment: function (enviroment = 0) {
            checkEnvironments(configuration.environments);
            if (typeof enviroment === "number") {
                configuration.chosenEnvironment = configuration.environments[0];
                return;
            }
            let env = configuration.environments.find(c => c.env === enviroment);
            if (env == undefined || env == null) {
                throw new Error("🌿 environment not found");
            }
            configuration.chosenEnvironment = env;
        },
        getEnvironment: function () {
            return configuration.chosenEnvironment;
        },
        getLocalization: function () {
            return configuration.chosenLocalization;
        },
        getConfigurationGlobal: function () {
            return configuration;
        }
    };
})();

let buttonsDOM = (() => {
    let elementStrategy;
    function buttonIsNotDefault(target) {
        return target != constTargetButtonCrudDefault.SAVE &&
            target != constTargetButtonCrudDefault.ALTER &&
            target != constTargetButtonCrudDefault.DELETE;
    }
    function createButtonOrLink(button) {
        if (button.type != "button" && button.type != "link") {
            throw new Error("tipo do botão deve ser button ou link");
        }
        if (button.type == "button") {
            elementStrategy = new ElementButton();
        }
        if (button.type == "link") {
            elementStrategy = new ElementLink();
        }
        return elementStrategy.createElement(button);
    }
    function getButton(target) {
        return document.getElementById(target);
    }
    function prepareLocalizations() {
        let globalization = document.getElementById(constIdBaseWindow.GLOBALIZATION);
        let olliGlobalization = document.getElementById(constIdBaseWindow.OLLI_GLOBALIZATION);
        globalization?.addEventListener("click", () => {
            olliGlobalization?.classList.toggle("r-display-none");
        });
        let globalConf = ruculaGlobal.getConfigurationGlobal();
        globalConf.localizations.forEach(loc => {
            const li = document.createElement("li");
            li.textContent = loc.language;
            olliGlobalization?.appendChild(li);
            li.addEventListener("click", () => {
                ruculaGlobal.setLocalization(loc.locales);
            });
        });
    }
    function prepareEnviroments() {
        let enviroment = document.getElementById(constIdBaseWindow.ENVIROMENT);
        let olliEnviroment = document.getElementById(constIdBaseWindow.OLLI_ENVIROMENT);
        enviroment?.addEventListener("click", () => {
            olliEnviroment?.classList.toggle("r-display-none");
        });
        let globalConf = ruculaGlobal.getConfigurationGlobal();
        globalConf.environments.forEach(enviroment => {
            const li = document.createElement("li");
            li.textContent = enviroment.env;
            olliEnviroment?.appendChild(li);
            li.addEventListener("click", () => {
                ruculaGlobal.setEnviroment(enviroment.env);
            });
        });
    }
    return {
        createButtonOrLink: (button) => createButtonOrLink(button),
        prepareButtonsInLeftBox: (button) => {
            const ListRightButtons = document.getElementById("r-a-menu-vertical-list");
            let buttons = button?.filter(c => buttonIsNotDefault(c.target));
            if (buttons?.length == 0 || buttons == undefined) {
                document.querySelector('.r-vertical-actions')?.classList.add('r-display-none');
            }
            buttons?.forEach(b => {
                const li = document.createElement("li");
                li.appendChild(createButtonOrLink(b));
                ListRightButtons?.appendChild(li);
            });
            prepareLocalizations();
            prepareEnviroments();
        },
        buttonIsNotDefault: (target) => buttonIsNotDefault(target),
        disable: (target) => {
            let button = getButton(target);
            button?.classList.remove('r-display-none');
            button?.setAttribute('disabled', '');
        },
        enable: (target) => {
            let button = getButton(target);
            button?.classList.remove('r-display-none');
            button?.removeAttribute('disabled');
        },
        hide: (target) => {
            let button = getButton(target);
            button?.classList.add('r-display-none');
        },
        destroy: (target) => {
            let button = getButton(target);
            button?.remove();
        }
    };
})();

let eventsCustom = (() => {
    let events = new Map();
    return {
        field: () => {
            function eventTypeLine(event) {
                return event.split(".").length == 4;
            }
            function removeLineNumber(eventName) {
                return eventName.replace(/\.[0-9]+$/, "");
            }
            function setEvent(eventName, event) {
                if (events.has(eventName) == false) {
                    events.set(eventName, event);
                }
            }
            return {
                set: (identity) => {
                    let beforeEventName = `${constPrefixEventField.BEFORE}.${identity.name}`;
                    let inputEventName = `${constPrefixEventField.INPUT}.${identity.name}`;
                    let afterEventName = `${constPrefixEventField.AFTER}.${identity.name}`;
                    let id = {
                        identity: identity
                    };
                    setEvent(beforeEventName, new CustomEvent(beforeEventName, { detail: id }));
                    setEvent(inputEventName, new CustomEvent(inputEventName, { detail: id }));
                    setEvent(afterEventName, new CustomEvent(afterEventName, { detail: id }));
                    setEventBaseTypeLine();
                    function setEventBaseTypeLine() {
                        if (eventTypeLine(beforeEventName)) {
                            let identity = {
                                identity: {}
                            };
                            let before = removeLineNumber(beforeEventName);
                            let input = removeLineNumber(inputEventName);
                            let after = removeLineNumber(afterEventName);
                            setEvent(before, new CustomEvent(before, { detail: identity }));
                            setEvent(input, new CustomEvent(input, { detail: identity }));
                            setEvent(after, new CustomEvent(after, { detail: identity }));
                        }
                    }
                },
                get: (eventName) => {
                    let result = null;
                    if (eventTypeLine(eventName)) {
                        let eventNameBase = removeLineNumber(eventName);
                        let eventBase = events.get(eventNameBase);
                        result = events.get(eventName);
                        eventBase.detail.identity = result.detail.identity;
                        return eventBase;
                    }
                    result = events.get(eventName);
                    if (result == null) {
                        throw new Error("event not found");
                    }
                    return result;
                }
            };
        }
    };
})();

class FieldInput {
    floatLabel = ruculaGlobal.getConfigurationGlobal().floatLabel;
    field;
    input;
    constructor(field) {
        this.field = field;
    }
    setWidth() {
        if (this.field.width > 0) {
            this.input.style.width = `${this.field.width}px`;
        }
        if (this.field.width === undefined && (this.input.type == constTypeInput.TEXT ||
            this.input.type == constTypeInput.NUMBER ||
            this.input.type == constTypeInput.CHECKBOX ||
            this.input.type == constTypeInput.SELECT)) {
            this.input.classList.add("r-input-width-default");
        }
    }
    exec() {
        this.create();
    }
}

class FileEvent {
    input;
    field;
    ruculaForm = windowBaseDOM.getElementRoot();
    constructor(input, field) {
        this.input = input;
        this.field = field;
        this.setEventListener();
    }
    dispatchEvent(prefixEvent) {
        let identity = this.input.getAttribute("identity");
        let fragment = managmentObject.fragment.getFragmentForIdentity(identity);
        let eventName = fragment.config.line ? `${prefixEvent}.${fragment.config.alias}.${fragment.config.propertDto}.${fragment.config.line}` : `${prefixEvent}.${fragment.config.alias}.${fragment.config.propertDto}`;
        let event = eventsCustom.field().get(eventName);
        this.ruculaForm?.dispatchEvent(event);
    }
    set() {
        let identity = this.input.getAttribute("identity");
        managmentObject.object.field.setValueContextIdentity(identity, this.field?.type, this.input.value);
    }
}

class FileEventCheckBox extends FileEvent {
    setEventListener() {
        this.input.addEventListener('change', (e) => {
            let element = e.target;
            if (element.checked == true) {
                element.value = this.field.checkbox.on;
            }
            if (element.checked == false) {
                element.value = this.field.checkbox.off;
            }
            this.set();
        });
    }
}

class FieldCheckbox extends FieldInput {
    create() {
        var input = document.createElement("input");
        this.input = input;
        input.type = "checkbox";
        input.checked = false;
        if (this.field.value == this.field.checkbox.on) {
            input.checked = true;
        }
        this.setEvents();
        return input;
    }
    setEvents() {
        new FileEventCheckBox(this.input, this.field);
    }
}

class FileEventCommon extends FileEvent {
    setEventListener() {
        this.input.addEventListener('focus', () => {
            fieldDOM.dependency.cleanFocusDependency(this.input);
            this.dispatchEvent(constPrefixEventField.BEFORE);
            this.set();
        });
        this.input.addEventListener('input', () => {
            this.set();
            this.dispatchEvent(constPrefixEventField.INPUT);
        });
        this.input.addEventListener('focusout', () => {
            this.dispatchEvent(constPrefixEventField.AFTER);
            this.set();
        });
    }
}

function formatCurrencyForNumber(valueCurrency) {
    valueCurrency = valueCurrency.replace(/[^-0-9,.\s]/g, "");
    let value = valueCurrency.split("");
    let decimal = false;
    for (let i = valueCurrency.length - 1; i >= 0; i--) {
        if ((value[i] == "," || value[i] == "." || value[i] == " ") && decimal) {
            value.splice(i, 1, "");
        }
        if ((value[i] == "," || value[i] == ".") && decimal == false) {
            decimal = true;
            value.splice(i, 1, ".");
        }
    }
    return Number(value.join(""));
}
function formatNumberWithLocalization(value) {
    if (typeof value === "string")
        value = Number(value);
    let localicationConfig = ruculaGlobal.getLocalization();
    return new Intl.NumberFormat(localicationConfig.locales, {
        style: 'currency',
        currency: localicationConfig.currency,
        maximumFractionDigits: 5
    }).format(value);
}

class FileEventCurrency extends FileEvent {
    setEventListener() {
        this.input.addEventListener('focusout', (e) => {
            let element = e.target;
            let valueFormated = formatCurrencyForNumber(element.value);
            this.input.value = String(valueFormated);
            this.set();
            this.input.value = formatNumberWithLocalization(element.value);
        });
    }
}

class FieldCommon extends FieldInput {
    create() {
        const input = document.createElement('input');
        this.input = input;
        if (this.floatLabel == true) {
            this.input.classList.add('did-floating-input');
        }
        input.setAttribute('placeholder', '');
        input.setAttribute(constAttrInput.ATTR_TYPE, this.field.type);
        if (this.field?.disable) {
            input.setAttribute("disabled", "");
        }
        input.type = this.field.type;
        if (this.field.type == "currency") {
            input.type = "text";
        }
        this.setWidth();
        input.classList.add("r-i-control");
        this.setEvents();
    }
    setEvents() {
        new FileEventCommon(this.input, this.field);
        if (this.field.type == constTypeInput.CURRENCY) {
            new FileEventCurrency(this.input, this.field);
        }
    }
}

class FieldRadio extends FieldInput {
    create() {
        let input = document.createElement("input");
        this.input = input;
        this.input.type = "radio";
        if (this.field.value === undefined || this.field.value === "") {
            throw new Error("Value in type radio is requerid");
        }
        this.input.value = this.field.value;
        this.setEvents();
    }
    setEvents() {
        new FileEventCommon(this.input, this.field);
    }
}

class FieldSelect extends FieldInput {
    create() {
        const select = document.createElement('select');
        this.input = select;
        this.setWidth();
        if (this.floatLabel == true) {
            this.input.classList.add('did-floating-select');
            this.input.setAttribute('value', '');
            this.input.addEventListener('click', (e) => {
                let value = e.target.value;
                this.input.setAttribute('value', value);
            });
        }
        this.field.combo?.forEach(item => {
            const option = document.createElement('option');
            option.text = item["representation"];
            option.value = item["value"];
            select.appendChild(option);
        });
        this.setEvents();
        return select;
    }
    setEvents() {
        new FileEventCommon(this.input, this.field);
    }
}

class FieldStrategy {
    field;
    setStrategy(field) {
        this.field = field;
    }
    create() {
        this.field.exec();
        return this.field.input;
    }
}

class FieldTextArea extends FieldInput {
    create() {
        const input = document.createElement('textarea');
        this.input = input;
        this.input.classList.add('r-i-control');
        input.setAttribute('placeholder', '');
        if (this.floatLabel == true) {
            this.input.classList.add('did-floating-input');
        }
        if (this.field?.disable) {
            input.setAttribute("disabled", "");
        }
        input.setAttribute("rows", String(this.field.textarea?.rows));
        if (this.field.textarea?.cols) {
            input.setAttribute("cols", String(this.field.textarea?.cols));
        }
        else {
            input.style.width = "100%";
        }
        this.setEvents();
        return input;
    }
    setEvents() {
        new FileEventCommon(this.input, this.field);
    }
}

let fieldDOM = (() => {
    function createSpanLabelIsRequerid() {
        ruculaGlobal.getConfigurationGlobal().floatLabel;
        const span = document.createElement('span');
        span.innerText = " *";
        span.style.color = "red";
        return span;
    }
    function createGroupOfButton(element) {
        const div = document.createElement('div');
        div.classList.add('r-g-i-i');
        div.appendChild(element);
        return div;
    }
    function createGroupOfInput(field, element) {
        const div = document.createElement('div');
        div.classList.add('r-g-i-i');
        const label = document.createElement('label');
        label.textContent = field.description;
        if (field.requerid == true) {
            label.textContent = label.textContent;
            label.append(createSpanLabelIsRequerid().cloneNode(true));
        }
        const floatLabel = ruculaGlobal.getConfigurationGlobal().floatLabel;
        if (floatLabel == true && (isSimple(field.type) || isTextArea(field.type) || isSelect(field.type))) {
            div.appendChild(element);
            div.classList.add('did-floating-label-content');
            label.classList.add('did-floating-label');
            div.appendChild(label);
            return div;
        }
        if (field.groupFormat == undefined) {
            label.classList.add('r-label-block');
            div.appendChild(label);
            div.appendChild(element);
        }
        if (field.groupFormat == constGroupFormat.DOWN) {
            label.classList.add('r-label-block');
            div.appendChild(element);
            div.appendChild(label);
        }
        if (field.groupFormat == constGroupFormat.LEFT) {
            label.classList.add('r-label-inline');
            element.style.marginRight = "8px";
            div.appendChild(element);
            div.appendChild(label);
        }
        if (field.groupFormat == constGroupFormat.RIGTH) {
            label.classList.add('r-label-inline');
            element.style.marginLeft = "8px";
            div.appendChild(label);
            div.appendChild(element);
        }
        return div;
    }
    function checkTypeField(type) {
        let option = type;
        if (Array.isArray(type)) {
            option = type[1];
        }
        let types = [
            "text",
            "number",
            "select",
            "checkbox",
            "date",
            "currency",
            "textarea",
            "bool",
            "radio",
            "password"
        ];
        if (types.indexOf(option) == -1) {
            throw new Error(`Field type "${option}" is not allowed`);
        }
    }
    function isSimple(type) {
        let condition = type == constTypeInput.NUMBER ||
            type == constTypeInput.TEXT ||
            type == constTypeInput.DATE ||
            type == constTypeInput.CURRENCY ||
            type == constTypeInput.PASS;
        return condition;
    }
    function isTextArea(type) {
        return type == constTypeInput.TEXT_AREA;
    }
    function isSelect(type) {
        return type[0] == constTypeInput.SELECT;
    }
    return {
        create: (field) => {
            let element;
            let fieldStrategy = new FieldStrategy();
            checkTypeField(field.type);
            if (isSimple(field.type)) {
                fieldStrategy.setStrategy(new FieldCommon(field));
            }
            if (isSelect(field.type)) {
                fieldStrategy.setStrategy(new FieldSelect(field));
            }
            if (isCheckBox()) {
                fieldStrategy.setStrategy(new FieldCheckbox(field));
            }
            if (isTextArea(field.type)) {
                fieldStrategy.setStrategy(new FieldTextArea(field));
            }
            if (isRadio()) {
                fieldStrategy.setStrategy(new FieldRadio(field));
            }
            element = fieldStrategy.create();
            if (field.maxLength) {
                element.setAttribute('maxlength', `${field.maxLength}`);
            }
            element.setAttribute("identity", field.identity);
            let fragmentField = managmentObject.fragment.getFragmentForIdentity(field.identity);
            let identity = {
                name: fragmentField.config.line ? `${fragmentField.config.alias}.${field.propertDto}.${fragmentField.config.line}` : `${fragmentField.config.alias}.${field.propertDto}`,
                element: element,
                row: fragmentField.config.line
            };
            eventsCustom.field().set(identity);
            managmentObject.object.field.setValueContextIdentity(field.identity, field.type, element.value);
            function isRadio() {
                return field.type[0] == constTypeInput.RADIO;
            }
            function isCheckBox() {
                return field.type[0] == constTypeInput.CHECKBOX;
            }
            return element;
        },
        createSpanLabelIsRequerid: () => {
            return createSpanLabelIsRequerid();
        },
        createGroupOfInput: (field, element) => createGroupOfInput(field, element),
        createGroupOfButton: (element) => createGroupOfButton(element),
        dependency: {
            focusFieldsWithDependency: () => {
                exportTableDependency
                    .getDependenciesNotResolded()
                    .filter(c => c.isHibernate == false)
                    ?.forEach(object => {
                    object.fieldsNotResolved?.forEach(identity => {
                        let input = document.querySelector('[identity=' + identity + ']');
                        input?.classList.add(constInputClass.FOCUS_IN_INPUT_WITH_DEPENDENCY);
                    });
                });
            },
            cleanFocusDependency: (input) => {
                input.classList.remove(constInputClass.FOCUS_IN_INPUT_WITH_DEPENDENCY);
            }
        }
    };
})();

function createFrame(frame) {
    const div = document.createElement('div');
    div.style.gridColumnStart = `${frame.layout.col.start}`;
    div.style.gridColumnEnd = `${frame.layout.col.end}`;
    div.style.gridRowStart = `${frame.layout.row.start}`;
    div.style.gridRowEnd = `${frame.layout.row.end}`;
    if (frame.type == constTypeFrame.BLOCK) {
        div.classList.add("r-q-b");
    }
    if (frame.type == constTypeFrame.LINE) {
        div.classList.add('r-q-l');
    }
    div.setAttribute('identity', frame.identity);
    const h3 = document.createElement('h3');
    h3.textContent = frame.name;
    h3.classList.add('r-t-f');
    div.appendChild(h3);
    return div;
}

let frameEvent = (() => {
    return {
        managedFrame: (frameElement) => {
            frameElement?.addEventListener('input', (event) => valueInformed(event));
            frameElement?.addEventListener('change', (event) => valueInformed(event));
            function valueInformed(event) {
                let target = event.target;
                let identity = target.getAttribute('identity');
                let fragmentObject = fragment.objects.getForFieldIdentity(identity);
                let count = managmentObject.object.object.count(fragmentObject.key.identity);
                if (count > 1) {
                    return;
                }
                if (target) {
                    exportTableDependency.moveImbernateToNotResolved(fragmentObject.key.identity);
                }
            }
        },
        cleanRequeridDependency: (frameElement) => {
            frameElement.addEventListener('keyup', (event) => {
                const key = event.key;
                let identity = event.target.getAttribute('identity');
                let fragmentObject = fragment.objects.getForFieldIdentity(identity);
                let count = managmentObject.object.object.count(fragmentObject.key.identity);
                if (count > 1) {
                    exportTableDependency.moveImbernateToNotResolved(fragmentObject.key.identity);
                }
                if (key == 'Escape' && count == 1) {
                    exportTableDependency.moveNotResolvedToImbernate(fragmentObject.key.identity);
                    resetManageFrameTypeLine(frameElement);
                    resetManageFrameTypeBlock(frameElement);
                }
            });
        }
    };
    function resetManageFrameTypeBlock(frameElement) {
        if (frameElement.classList.contains('r-q-b') == false) {
            return;
        }
        cleanFrame(frameElement);
    }
    function resetManageFrameTypeLine(element) {
        if (element.nodeName != 'TR') {
            return;
        }
        cleanFrame(element);
    }
    function cleanFrame(blockORLine) {
        blockORLine.querySelectorAll('input')
            .forEach(input => input.value = '');
        blockORLine.querySelectorAll('select')
            .forEach(select => {
            let option = select.querySelector('option');
            select.value = option?.value || '';
        });
    }
})();

let frameValues = (() => {
    return {
        setValuesDefined: function (frame, htmlElement) {
            frame.fields?.forEach(field => {
                let input = htmlElement.querySelector(field.identity);
                if (input) {
                    managmentObject.object.field.setValueContextIdentity(field.identity, field.type, input.value);
                }
            });
        }
    };
})();

function createFrameBlock(frame) {
    managmentObject.frame.configFieldBlock(frame);
    const frameElement = createFrame(frame);
    const div = document.createElement("div");
    div.classList.add("r-q-i");
    if (frame.vertical) {
        div.style.flexDirection = "column";
    }
    frame.fields?.forEach(field => {
        if (field?.button) {
            let buttonElement = buttonsDOM.createButtonOrLink(field.button);
            let groupElement = fieldDOM.createGroupOfButton(buttonElement);
            div.appendChild(groupElement);
            return;
        }
        let fieldElement = fieldDOM.create(field);
        let groupElement = fieldDOM.createGroupOfInput(field, fieldElement);
        div.appendChild(groupElement);
        fieldMenuContext.info.set({
            identity: field.identity,
            field: field
        });
    });
    frameValues.setValuesDefined(frame, div);
    frameElement.appendChild(div);
    if (frame.requerid == false) {
        exportTableDependency.moveNotResolvedToImbernate(frame.alias);
        frameEvent.managedFrame(div);
        frameEvent.cleanRequeridDependency(div);
    }
    return frameElement;
}

let configWindow = (() => {
    let _window;
    return {
        set: (window) => {
            if (_window) {
                return;
            }
            _window = window;
        },
        get: () => {
            return _window;
        },
        frame: {
            get: (identity) => {
                return _window.frames.find(c => c.identity == identity);
            }
        }
    };
})();

let keyEvent = new Array();
function KeyEventClear() {
    keyEvent = [];
}
function KeyEventAdd(key) {
    if (keyEvent.filter(c => c == key).length == 0) {
        keyEvent.push(key);
    }
    keyEvent.sort();
}
function KeyEventGetIndex(index) {
    return keyEvent[index];
}

let FrameLineEventDOM = (() => {
    let currentLineElement;
    let inputTargetEvent;
    function createNewLine(currentLineElement, element) {
        let field = fragment.fields.getForIdentity(element.getAttribute("identity"));
        let newline = frameLineTableDOM.table.detail.createNewRowDetail(field.config.fragmentObjectIdentity);
        currentLineElement.after(newline);
    }
    function deleteLine(currentLineElement, element) {
        frameLineTableDOM.table.detail.deleteRowDetail(currentLineElement, element);
    }
    function crudLineQuadro(event) {
        const key = event.key;
        KeyEventAdd(key);
        let nextLine = null;
        let previousLine = null;
        inputTargetEvent = event.target;
        currentLineElement = event.currentTarget;
        let identity = inputTargetEvent.getAttribute("identity");
        let inputs = currentLineElement.querySelectorAll('input');
        let positionInput = 0;
        for (let index = 0; index < inputs.length; index++) {
            if (inputs[index].getAttribute("identity") == identity) {
                positionInput = index;
                break;
            }
        }
        if (KeyEventGetIndex(0) == "ArrowUp") {
            event.preventDefault();
            previousLine = currentLineElement.previousSibling;
            let inputs = previousLine?.querySelectorAll('input');
            if (inputs) {
                inputs[positionInput]?.focus();
            }
        }
        if (KeyEventGetIndex(0) == "ArrowDown") {
            event.preventDefault();
            nextLine = currentLineElement.nextSibling;
            let inputs = nextLine?.querySelectorAll('input');
            if (inputs) {
                inputs[positionInput]?.focus();
            }
        }
        if (KeyEventGetIndex(0) == undefined || KeyEventGetIndex(1) == undefined) {
            return;
        }
        if (KeyEventGetIndex(0) == "Control" && KeyEventGetIndex(1) == "Enter") {
            event.preventDefault();
            createNewLine(currentLineElement, inputTargetEvent);
        }
        if (KeyEventGetIndex(0) == "0" && KeyEventGetIndex(1) == "Control") {
            event.preventDefault();
            deleteLine(currentLineElement, inputTargetEvent);
        }
        KeyEventClear();
    }
    return {
        eventActions: (actions) => {
            let add = actions.querySelector(`#${constFrameLineActions.ADD}`);
            let remove = actions.querySelector(`#${constFrameLineActions.REMOVE}`);
            add?.addEventListener('click', (e) => {
                let params = TRAndInput(e);
                createNewLine(params.tr, params.input);
            });
            remove?.addEventListener('click', (e) => {
                let params = TRAndInput(e);
                deleteLine(params.tr, params.input);
            });
            function TRAndInput(e) {
                let anchor = e.currentTarget;
                let td = anchor?.parentElement?.parentElement;
                let tr = td?.parentElement;
                let input = td?.nextSibling?.querySelector('input,select');
                return {
                    tr: tr,
                    input: input
                };
            }
        },
        eventKeyDownKeyUpLineFrame: (element) => {
            element.addEventListener('keydown', (event) => {
                const key = event.key;
                KeyEventAdd(key);
                crudLineQuadro(event);
            });
            element.addEventListener('keyup', (event) => {
                KeyEventClear();
            });
        },
        addActionsInCell: (tr, identity) => {
            let tdActions = tr.querySelector('td');
            let fragmentObject = managmentObject.fragment.getFragmentForIdentity(identity);
            tr.addEventListener('mouseover', (e) => {
                let actions = document.getElementById(fragmentObject.config.fragmentObjectIdentity);
                tdActions?.appendChild(actions);
            });
        }
    };
})();

let frameLineTableDOM = (() => {
    function getCellActions(tr) {
        return tr.querySelector('td');
    }
    return {
        table: {
            header: {
                createHeader: (frame) => {
                    let trColumns = document.createElement('tr');
                    let trTitle = document.createElement('tr');
                    let thTitle = document.createElement('th');
                    trTitle.appendChild(thTitle);
                    thTitle.style.textAlign = 'start';
                    thTitle.classList.add('title');
                    let thead = document.createElement('thead');
                    thead.appendChild(trTitle);
                    thead.appendChild(trColumns);
                    const actions = document.createElement('th');
                    trColumns.appendChild(actions);
                    frame.fields?.forEach(field => {
                        const th = document.createElement('th');
                        th.textContent = field.description;
                        if (field.requerid == true) {
                            th.textContent = th.textContent;
                            th.append(fieldDOM.createSpanLabelIsRequerid().cloneNode(true));
                        }
                        alignItem(field, th);
                        trColumns.appendChild(th);
                    });
                    let columnsLength = trColumns.querySelectorAll('th');
                    thTitle.setAttribute('colspan', String(columnsLength.length));
                    return thead;
                }
            },
            detail: {
                getCellActions: (tr) => getCellActions(tr),
                createRowDetail: (frame) => {
                    managmentObject.frame.addLine(frame);
                    let tr = document.createElement('tr');
                    const tdActions = document.createElement('td');
                    tdActions.setAttribute('ruc-action', '');
                    tr.appendChild(tdActions);
                    if (frame.fields) {
                        FrameLineEventDOM.addActionsInCell(tr, frame.fields[0].identity);
                    }
                    frame.fields?.forEach((field) => {
                        const td = document.createElement('td');
                        const elementInput = fieldDOM.create(field);
                        td.appendChild(elementInput);
                        var alignInInput = elementInput.getAttribute('type') != "checkbox";
                        if (alignInInput) {
                            alignItem(field, elementInput);
                        }
                        if (alignInInput == false) {
                            alignItem(field, td);
                        }
                        tr.appendChild(td);
                        fieldMenuContext.info.set({
                            identity: field.identity,
                            field: field
                        });
                    });
                    let rowCount = managmentObject.object.object.count(frame.identity);
                    frameValues.setValuesDefined(frame, tr);
                    if (frame.requerid == false && rowCount == 1) {
                        frameEvent.managedFrame(tr);
                        frameEvent.cleanRequeridDependency(tr);
                        exportTableDependency.moveNotResolvedToImbernate(frame.identity);
                    }
                    if (frame.requerid == false && rowCount > 1) {
                        exportTableDependency.moveImbernateToNotResolved(frame.identity);
                    }
                    return tr;
                },
                createNewRowDetail: function (identityObject) {
                    let frame = configWindow.frame.get(identityObject);
                    const row = frameLineTableDOM.table.detail.createRowDetail(frame);
                    row.querySelector("input")?.focus();
                    FrameLineEventDOM.eventKeyDownKeyUpLineFrame(row);
                    return row;
                },
                deleteRowDetail: function (currentLineElement, inputTargetEvent) {
                    let nextSibling = currentLineElement.nextSibling;
                    let previousSibling = currentLineElement.previousSibling;
                    let Tbody = currentLineElement.parentNode;
                    let rowElement = currentLineElement;
                    currentLineElement = rowElement;
                    let identityInputTartget = inputTargetEvent.getAttribute("identity");
                    let fragmentObject = managmentObject.fragment.getFragmentForIdentity(identityInputTartget);
                    let field = fragment.fields.getForIdentity(identityInputTartget);
                    let frame = configWindow.frame.get(field.config.fragmentObjectIdentity);
                    moveActions(fragmentObject.config.fragmentObjectIdentity);
                    let count = managmentObject.object.object.count(frame.identity);
                    let actions = currentLineElement.querySelector('td div');
                    currentLineElement.remove();
                    managmentObject.object.object.removeLine(frame.identity, field.config.line);
                    managmentObject.fragment.removeFragmentsLine(frame.identity, field.config.line);
                    if (count <= 1) {
                        let newLine = frameLineTableDOM.table.detail.createNewRowDetail(frame.identity);
                        let tdActions = getCellActions(newLine);
                        tdActions?.appendChild(actions);
                        Tbody.appendChild(newLine);
                        newLine?.querySelector("input")?.focus();
                    }
                    function moveActions(fragmentObject) {
                        let actions = document.getElementById(fragmentObject);
                        if (previousSibling) {
                            previousSibling?.querySelector("input")?.focus();
                            let tdActions = getCellActions(previousSibling);
                            tdActions?.appendChild(actions);
                            return;
                        }
                        if (nextSibling) {
                            nextSibling?.querySelector("input")?.focus();
                            let tdActions = getCellActions(nextSibling);
                            tdActions?.appendChild(actions);
                        }
                    }
                }
            }
        }
    };
})();

let frameLineDOM = (() => {
    function createTDActions(identity) {
        const div = document.createElement('div');
        div.setAttribute('id', identity);
        div.setAttribute('class', 'f-l-actions r-text-nowrap');
        div.innerHTML = `<a class="add" id=${constFrameLineActions.ADD}><i class="bi bi-plus-lg"></i></a>
            <a class="remove" id=${constFrameLineActions.REMOVE}><i class="bi bi-trash"></i></a>`;
        FrameLineEventDOM.eventActions(div);
        return div;
    }
    function createFrameLine(frame) {
        const frameLine = createFrame(frame);
        const table = document.createElement('table');
        table.classList.add("f-t-line");
        let title = frameLine.querySelector('h3');
        const rowHeader = frameLineTableDOM.table.header.createHeader(frame);
        let thTitle = rowHeader.querySelector('th');
        thTitle.appendChild(title);
        table.appendChild(rowHeader);
        const tbody = document.createElement('tbody');
        const rowDetail = frameLineTableDOM.table.detail.createRowDetail(frame);
        let td = frameLineTableDOM.table.detail.getCellActions(rowDetail);
        td?.appendChild(createTDActions(frame.identity));
        tbody.appendChild(rowDetail);
        table.appendChild(tbody);
        frameLine.appendChild(table);
        FrameLineEventDOM.eventKeyDownKeyUpLineFrame(rowDetail);
        return frameLine;
    }
    return {
        createFrameLine: (frame) => {
            return createFrameLine(frame);
        },
    };
})();

let urlManagment = (() => {
    return {
        createURL: function (controller, button) {
            if (button.URL)
                if (button.URL?.absolute?.length > 0) {
                    let url = urlManagment.createPath(button.URL.absolute);
                    return url;
                }
            let enviroment = ruculaGlobal.getEnvironment();
            let url = `${enviroment.hostname}:${enviroment.port}`;
            controller = controller.replace(/^\/+/gm, '');
            let params = '';
            if (button.URL)
                if (button.URL?.params?.length > 0) {
                    params = urlManagment.createPath(button.URL.params);
                    url = `${url}/${controller}?${params}`;
                    return url;
                }
            if (button.URL)
                if (button.URL?.relative?.length > 0) {
                    let path = urlManagment.createPath(button.URL.relative);
                    return `${url}/${path}`;
                }
            return url;
        },
        createWithParams: function (path) {
            var regex = /([^&]+=)({([^}&]+)})/g;
            var matches = path.matchAll(regex);
            for (const match of matches) {
                var propertValue = match[3];
                var value = managmentObject.object.object.getPropert(propertValue);
                path = path.replace(match[0], `${match[1]}${value}`);
            }
            return path;
        },
        createWithoutParams: function (path) {
            var regex = /\/{([^}&]+)}/gm;
            var matches = path.matchAll(regex);
            for (const match of matches) {
                var propertValue = match[1];
                var value = managmentObject.object.object.getPropert(propertValue);
                path = path.replace(match[0], `/${value}`);
            }
            return path;
        },
        createPath: function (path) {
            path = urlManagment.createWithParams(path);
            path = urlManagment.createWithoutParams(path);
            return path;
        }
    };
})();

function eventButton(pathController, buttons) {
    let rucula = windowBaseDOM.getElementRoot();
    buttons?.filter(b => b.type === "button")
        .forEach((button) => {
        let element = document?.getElementById(button.target);
        let object = {
            detail: {
                url: '',
                body: {}
            }
        };
        let dependency = {
            detail: {}
        };
        let eventButton = new CustomEvent(`${button.target}`, object);
        let eventButtonDependency = new CustomEvent(`${button.target}.dependency`, dependency);
        element?.addEventListener("click", () => {
            let dependencyCount = exportTableDependency.dependenciesCount();
            if (dependencyCount > 0) {
                fieldDOM.dependency.focusFieldsWithDependency();
                rucula.dispatchEvent(eventButtonDependency);
                return;
            }
            object.detail.url = urlManagment.createURL(pathController, button);
            let option = button?.body;
            if (option == undefined) {
                rucula.dispatchEvent(eventButton);
                return;
            }
            if (option == '') {
                object.detail.body = managmentObject.object.object.objectSeparate();
            }
            if (option == '.') {
                object.detail.body = managmentObject.object.object.objectFull();
            }
            if (['', '.', undefined].find(c => c != option) == undefined) {
                object.detail.body = managmentObject.object.object.objectUnique(option);
            }
            rucula.dispatchEvent(eventButton);
        });
    });
}
function openCloseRightListButtons() {
    const openClose = document.getElementById("r-a-menu-vertical");
    const listRight = document.querySelector(".r-vertical-actions");
    const openClosemobile = document.getElementById(constIdBaseWindow.BUTTONS_MENU_VERTICAL_MOBILE);
    openClose?.addEventListener("click", () => {
        listRight?.classList.toggle("r-display-none");
    });
    openClosemobile?.addEventListener("click", () => {
        listRight?.classList.toggle("r-display-none");
    });
}

let defaultValues = (() => {
    const configFrameDefault = {
        TYPE_FRAME: constTypeFrame.BLOCK,
        VERTICAL: true,
        REQUERID: true
    };
    const configInputDefault = {
        TYPE: constTypeInput.TEXT,
        REQUERID_TRUE: true,
        REQUERID_FALSE: false,
        DISABLE: false
    };
    function setDefaultFrame(frame) {
        frame.type ??= configFrameDefault.TYPE_FRAME;
        frame.vertical ??= configFrameDefault.VERTICAL;
        frame.requerid ??= configFrameDefault.REQUERID;
    }
    function setDefaultInput(field) {
        field.type ??= configInputDefault.TYPE;
        field.disable ??= configInputDefault.DISABLE;
        field.requerid ??= configInputDefault.REQUERID_FALSE;
    }
    return {
        setDefault: (window) => {
            window.grid ??= true;
            window.gridFooter ??= true;
            window.gridSearch ??= true;
            window.frames.forEach(frame => {
                setDefaultFrame(frame);
                frame.fields?.forEach(field => {
                    setDefaultInput(field);
                });
            });
        }
    };
})();

let layoutFrames = (() => {
    function configureLayout(window) {
        if (window.layout.items === undefined) {
            return;
        }
        let rowLength = window.layout.items.length;
        let colLength = window.layout.items[0].length;
        window.layout.tamplateColumns = colLength;
        window.layout.tamplateRow = rowLength;
        setGridContainer(window.layout.tamplateColumns, window.layout.tamplateRow);
        for (let row = 1; row <= rowLength; row++) {
            for (let col = 1; col <= colLength; col++) {
                let item = window.frames.find(c => c.alias == window.layout.items[row - 1][col - 1]);
                if (item == undefined) {
                    continue;
                }
                if (item.layout === undefined) {
                    item.layout = { row: { start: -1, end: -1 }, col: { start: -1, end: -1 } };
                }
                if (item.layout.row.start === -1) {
                    item.layout.row.start = row;
                }
                if (item.layout.col.start === -1) {
                    item.layout.col.start = col;
                }
                item.layout.row.end = row + 1;
                item.layout.col.end = col + 1;
            }
        }
    }
    function setGridContainer(tamplateColumns, tamplateRows) {
        let form = windowBaseDOM.getPrincipalElementRucula();
        form.style.gridTemplateColumns = `repeat(${tamplateColumns},1fr)`;
        form.style.gridTemplateRows = `repeat(${tamplateRows},1fr )`;
    }
    return {
        configureLayout: (window) => configureLayout(window)
    };
})();

let buttonsBase = (function () {
    let buttonCreate;
    let buttonAlter;
    let buttonDelete;
    let buttonsPlus;
    let olButtonsPlus;
    return {
        initButtonsTypeCrudDefault: () => {
            buttonCreate = document.getElementById(constTargetButtonCrudDefault.SAVE);
            buttonAlter = document.getElementById(constTargetButtonCrudDefault.ALTER);
            buttonDelete = document.getElementById(constTargetButtonCrudDefault.DELETE);
        },
        initButtonPlus: () => {
            buttonsPlus = document.getElementById(constIdBaseWindow.BUTTONS_MENU_VERTICAL);
            olButtonsPlus = document.getElementById(constIdBaseWindow.BUTTONS_MENU_VERTICAL_LIST);
            if (olButtonsPlus.querySelectorAll("button").length == 0) {
                buttonsPlus.remove();
                olButtonsPlus.remove();
            }
        },
        buttonsTypeCrud: {
            click: {
                create: () => buttonCreate.click(),
                alter: () => buttonAlter.click(),
                delete: () => buttonDelete.click()
            },
            remove: {
                create: () => buttonCreate.remove(),
                alter: () => buttonAlter.remove(),
                delete: () => buttonDelete.remove()
            },
            crud: (crud) => {
                if (crud == "" || crud == undefined) {
                    buttonCreate.remove();
                    buttonAlter.remove();
                    buttonDelete.remove();
                    return;
                }
                let options = "crud";
                for (let index = 0; index < crud.length; index++) {
                    let indexof = options.indexOf(crud[index]);
                    options = options.replace(options[indexof], "");
                }
                if (options.length < 1 || (options.length == 1 && options[0] == "r")) {
                    return;
                }
                for (let index = 0; index < options.length; index++) {
                    if (options[index] == "c") {
                        buttonCreate.remove();
                    }
                    if (options[index] == "u") {
                        buttonAlter.remove();
                    }
                    if (options[index] == "d") {
                        buttonDelete.remove();
                    }
                }
            }
        }
    };
})();

let loaderManagment = (() => {
    let loaderBkp = document.createElement('div');
    let loaderElement = document.createElement('div');
    loaderElement.classList.add('r-loader');
    loaderElement.classList.add('js-r-loader');
    loaderElement.classList.add('r-item-center');
    let boxShow;
    return {
        enable: function () {
            boxShow = document.getElementById('r-box-show');
            boxShow?.classList.add('r-box-show-center');
            boxShow?.appendChild(loaderElement);
        },
        disable: function () {
            let loader = document.querySelector('.js-r-loader');
            loaderBkp.appendChild(loader);
            boxShow?.classList.remove('r-box-show-center');
        }
    };
})();

let rucula = {
    log: (() => {
        return {
            dependencies: function () {
                return exportTableDependency.getDependenciesNotResolded();
            },
            object: function () {
                return managmentObject.object.object.objectFull();
            }
        };
    })()
};
function logs() {
    window.rucula = rucula;
}

let eventManagment = (() => {
    return {
        field: {
            getDetails: (event) => {
                let identity = event.detail.identity;
                return {
                    identity: identity.element.getAttribute('identity'),
                    name: identity.name,
                    row: identity.row,
                    value: managmentObject.object.object.getPropert(identity.name),
                    targetPathWithRow: (targetPath) => {
                        return `${targetPath}.${identity.row}`;
                    }
                };
            }
        },
        on: (event, callback, query) => {
            let rucula = windowBaseDOM.getElementRoot();
            if (query == undefined) {
                rucula.addEventListener(event, (e) => callback(e));
                return;
            }
            let itens = rucula.querySelectorAll(query);
            itens.forEach((item) => {
                item.addEventListener(event, (e) => callback(e));
            });
        }
    };
})();

class Rucula {
    window;
    elementRucula;
    elementFormRucula;
    constructor(config, window, id = 'rucula-js') {
        ruculaGlobal.initGlobalConfiguration(config);
        windowBaseDOM.setElementRoot(id);
        this.window = window;
        this.elementRucula = document.getElementById(id);
        this.initWindow();
    }
    initWindow() {
        let eventInit = new Event('rucula.init');
        let eventLoad = new Event('rucula.load');
        let rucula = windowBaseDOM.getElementRoot();
        rucula.dispatchEvent(eventInit);
        configWindow.set(this.window);
        defaultValues.setDefault(this.window);
        windowBaseDOM.createWindowBase(this.elementRucula.id);
        this.addHomeWindow();
        managmentObject.frame.initObjects(this.window.frames);
        windowBaseDOM.createNameWindow(this.window.name);
        windowBaseDOM.closeLeftGrid(this.window.grid);
        this.elementFormRucula = windowBaseDOM.getPrincipalElementRucula();
        exportPaginationEvents.headerSearch(this.window.gridSearch);
        exportPaginationEvents.fotter(this.window.gridFooter);
        layoutFrames.configureLayout(this.window);
        this.createFrames();
        this.createButtons();
        buttonsBase.initButtonsTypeCrudDefault();
        buttonsBase.initButtonPlus();
        buttonsBase.buttonsTypeCrud.crud(this.window?.crud);
        rucula.dispatchEvent(eventLoad);
        logs();
    }
    addHomeWindow() {
        if (this.window?.iconHome) {
            let icon = document.getElementById("r-f-home-icon");
            icon?.classList.add(this.window.iconHome);
        }
        if (this.window?.messageHome) {
            let title = document.getElementById("r-f-home-title");
            title.textContent = this.window?.messageHome;
        }
        let titles = document.querySelectorAll(`.${constIdBaseWindow.TITLE}`);
        titles?.forEach(title => {
            title.textContent = this.window.name;
        });
    }
    createButtons(type = "CRUD") {
        if (type == "CRUD") {
            buttonsDOM.prepareButtonsInLeftBox(this.window.button);
        }
        eventButton(this.window.pathController, this.window.button);
        openCloseRightListButtons();
    }
    createFrames() {
        this.window.frames?.forEach(frame => {
            if (frame.type == constTypeFrame.BLOCK) {
                const block = createFrameBlock(frame);
                this.elementFormRucula.appendChild(block);
            }
            if (frame.type == constTypeFrame.LINE) {
                const line = frameLineDOM.createFrameLine(frame);
                this.elementFormRucula.appendChild(line);
            }
        });
    }
    loader = loaderManagment;
    popup = popup;
    event = eventManagment;
    buttons = buttonsDOM;
    object = (() => {
        return {
            objectUnique: (alias) => managmentObject.object.object.objectUnique(alias),
            getFullObject: () => managmentObject.object.object.objectFull(),
            getSepareteObject: () => managmentObject.object.object.objectSeparate(),
            setValue: (targetPath, value) => {
                const ATTR_DISABLED = 'disabled';
                let identity = managmentObject.object.field.convertAliasToIdenty(targetPath);
                let input = document.querySelector('[identity=' + identity + ']');
                let disabled = input.getAttribute(ATTR_DISABLED) == null ? null : ATTR_DISABLED;
                if (disabled) {
                    input.removeAttribute(ATTR_DISABLED);
                }
                input.value = value;
                input.focus({ preventScroll: true });
                input.blur();
                if (disabled) {
                    input.setAttribute(ATTR_DISABLED, '');
                }
            },
            getValue: (config) => {
                return managmentObject.object.object.getPropert(config);
            }
        };
    })();
}

export { Rucula };
