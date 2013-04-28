/**
 * Selectable
 * @creator  清羽<qingyu@taobao.com> & 博玉<boyu@taobao.com>
 */
KISSY.add('gallery/selectable/1.0/base', function(S) {

    var DOM = S.DOM, Event = S.Event,
        CLS_PREFIX = 'ks-selectable-',
        DATA_PREFIX = 'ks-data-',
        NONE_SELECTED_INDEX = -1, DOT = '.',
        EVENT_INIT = 'init',
        EVENT_SELECT_BY_INDEX = 'selectByIndex',
        EVENT_SELECT_BY_VALUE = 'selectByValue',
        EVENT_SELECT_BY_ITEM = 'selectByItem',
        EVENT_PREV = 'prev', EVENT_NEXT = 'next',
        EVENT_FILTER = 'filter', EVENT_CLEAR_FILTER = 'clearFilter';

    /**
     * Selectable Widget
     * attached members：
     *   - this.container
     *   - this.config
     *   - this.items  可以为空值 []
     *   - this.length
     *   - this.selectedIndex
     */
    function Selectable(container, config) {
        var self = this;

        // 调整配置信息
        config = config || {};
        if (!('markupType' in config)) {
            if (config.itemCls) {
                config.markupType = 1;
            } else if (config.items) {
                config.markupType = 2;
            }
        }
        config = S.merge(Selectable.Config, config || {});

        /**
         * the container of widget
         * @type HTMLElement
         */
        self.container = DOM.get(container);

        /**
         * the current items of widget
         * @type Array
         */
        //self.items;

        /**
         * the fullItems of widget
         * @type Array
         */
        //self.fullItems;

        /**
         * the configration of widget
         * @type Object
         */
        self.config = config;

        /**
         * 当前选中项索引值
         * @type Number
         */
        //self.selectedIndex;

        /**
         * value-item的map
         * @type Object
         */
        //self.valueMap;

        self._init();
    }

    //默认配置
    Selectable.Config = {
        // markup 的类型,取值如下：
        markupType: 0,

        //0 默认方式,通过container获取items;

        //1 灵活方式,通过class获取items;
        itemCls: CLS_PREFIX + 'item',

        //2 自由方式,自由传入items
        items: [],

        //选中的item的class
        selectedItemCls: CLS_PREFIX + 'selected',

        //隐藏item的class,若不设置则使用display:none
        invisibleItemCls: undefined,

        // 获取值的属性
        valueKey: DATA_PREFIX + 'value',

        //默认选中项索引值
        selectedIndex: undefined,

        //选项的默认display属性值
        defaultDisplay: undefined
    };

    // 插件
    Selectable.Plugins = [];

    S.augment(Selectable, Event.Target, {

        //初始化
        _init: function() {
            var self = this, cfg = self.config;

            self._parseMarkup();
            self._buildValueMap();

            //若果在html代码结构中写入了selectdItemCls那么直接忽略selectedIndex
            if (!self._selectBySelectedClass() && cfg.selectedIndex !== undefined) {
                self.index(cfg.selectedIndex);
            }
            if (!cfg.defaultDisplay) {
                cfg.defaultDisplay = DOM.css(self.items[0], 'display');
            }

            self.fire(EVENT_INIT);
        },

        //解析html,获得items
        _parseMarkup: function() {
            var self = this, cfg = self.config,
                container = self.container, items = [];

            switch (cfg.markupType) {
                case 0: //默认方式
                    items = DOM.children(container);
                    break;
                case 1: //灵活方式
                    items = DOM.query(DOT + cfg.itemCls, container);
                    break;
                case 2: //自由方式
                    items = cfg.items;
            }

            self.items = S.makeArray(items);
            self.fullItems = self.items;
        },

        //创建Value-Item Map
        _buildValueMap: function() {
            var self = this, config = self.config,
                obj = {};
            S.each(self.items, function(item) {
                var value = DOM.attr(item, config.valueKey);
                if (value !== undefined) {
                    obj[value] = item;
                }
            });
            self.valueMap = obj;
        },

        //取消当前选中项
        _cancelSelectedItem: function() {
            var item = this.items[this.selectedIndex],
                SELECTED_ITEM_CLS = this.config.selectedItemCls;
            DOM.removeClass(item, SELECTED_ITEM_CLS);
            this.selectedIndex = undefined;
        },

        //设置选中项
        _setSelectedItem: function(index) {
            var item = this.items[index],
                SELECTED_ITEM_CLS = this.config.selectedItemCls;
            if (item) {
                DOM.addClass(item, SELECTED_ITEM_CLS);
                this.selectedIndex = index;
            } else {
                this.selectedIndex = undefined;
            }
        },

        //根据selectedItemCls选中选项
        _selectBySelectedClass: function() {
            var self = this,
                selectedIndex = null,
                items = self.items,
                item,
                done = false,
                cfg = self.config;
            for (var i = 0, len = items.length; i < len; i++) {
                item = items[i];
                if (DOM.hasClass(item, cfg.selectedItemCls)) {
                    //获取第一个选项的index值
                    if (selectedIndex == null) {
                        selectedIndex = i;
                        done = true;
                    }
                    DOM.removeClass(item, cfg.selectedItemCls);
                }
            }
            self.index(selectedIndex);
            return done;
        },

        /**
         * 根据索引值选择，不传参数为获得当前选择项索引值
         * @param    index    Number    索引值,若为-1(NONE_SELECTED_INDEX),则不选中任何项
         * @return    HTMLElement    当前选中的项
         */
        index: function(index) {
            var self = this, item;

            if (index === undefined) { //获取index
                return self.selectedIndex;
            } else { //根据index选择
                if (self.selectedIndex !== undefined) {
                    self._cancelSelectedItem();
                }
                self._setSelectedItem(index);
                item = self.items[self.selectedIndex];

                if (item !== undefined) {
                    self.fire(EVENT_SELECT_BY_INDEX);
                }
                return item;
            }

        },

        /**
         * 根据value值选择，不传参数为获得当前选择项value值
         */
        value: function(value) {
            var self = this,
                //config = self.config,
                item;

            if (value === undefined) { //获取value
                item = self.item();
                if (item) {
                    return DOM.attr(item, self.config.valueKey);
                }
            } else { //根据value选择
                item = self.valueMap[value];
                if (item) {
                    for (var i = 0, len = self.items.length; i < len; i++) {
                        if (item === self.items[i]) {
                            self.index(i);
                            self.fire(EVENT_SELECT_BY_VALUE);
                            return item;
                        }
                    }
                }
            }
        },

        /**
         * 根据item元素选择，不传参数为获得当前选择项item
         */
        item: function(item) {
            var self = this;

            if (item === undefined) { //获取item
                if (self.selectedIndex !== undefined) {
                    return self.items[self.selectedIndex];
                }
            } else { //根据item选择
                for (var i = 0, len = self.items.length; i < len; i++) {
                    if (item === self.items[i]) {
                        self.index(i);
                    }
                }
            }
        },

        //选择前一项
        prev: function() {
            var self = this;

            if (self.selectedIndex === undefined) {
                self.selectedIndex = 0;
            }
            self.index(self.selectedIndex > 0 ? self.selectedIndex - 1 : self.items.length - 1);

            self.fire(EVENT_PREV);

            return self.item();
        },

        //选择后一项
        next: function() {
            var self = this;

            if (self.selectedIndex === undefined) {
                self.selectedIndex = self.items.length - 1;
            }
            self.index(self.selectedIndex < self.items.length - 1 ? self.selectedIndex + 1 : 0);

            self.fire(EVENT_NEXT);

            return self.item();
        },

        //根据提供的方法过滤
        filter: function(fn) {
            var self = this, items = this.fullItems, cfg = this.config, filterResult = [],
                INVISIBLE_ITEM_CLS = cfg.invisibleItemCls;
            self.clearFilter();

            if (!S.isFunction(fn)) {
                return;
            }

            S.each(items, function(item) {
                //如果当前有选中值,则置空选中值
                this.index(NONE_SELECTED_INDEX);
                if (!fn(item, this)) {
                    if (INVISIBLE_ITEM_CLS) {
                        DOM.addClass(item, INVISIBLE_ITEM_CLS);
                    } else {
                        DOM.css(item, 'display', 'none');
                    }
                } else {
                    filterResult.push(item);
                }
            }, self);

            self.items = filterResult;

            self.fire(EVENT_FILTER);

            return filterResult;
        },

        clearFilter: function() {
            var self = this, cfg = this.config,
                INVISIBLE_ITEM_CLS = cfg.invisibleItemCls;

            //如果当前有选中值,则置空选中值
            self.index(NONE_SELECTED_INDEX);
            self.items = self.fullItems;
            if (INVISIBLE_ITEM_CLS) {
                DOM.removeClass(self.items, INVISIBLE_ITEM_CLS);
            } else {
                DOM.css(self.items, 'display', cfg.defaultDisplay);
            }

            self.fire(EVENT_CLEAR_FILTER);
        }

    });

    //TODO: Selectable拥有的所有事件，考虑是否推广成为kissy组件的一个设计规范？
    Selectable.events = {
        EVENT_INIT: EVENT_INIT,
        EVENT_SELECT_BY_INDEX: EVENT_SELECT_BY_INDEX,
        EVENT_SELECT_BY_VALUE: EVENT_SELECT_BY_VALUE,
        EVENT_SELECT_BY_ITEM: EVENT_SELECT_BY_ITEM,
        EVENT_PREV: EVENT_PREV,
        EVENT_NEXT: EVENT_NEXT,
        EVENT_FILTER: EVENT_FILTER,
        EVENT_CLEAR_FILTER: EVENT_CLEAR_FILTER
    };

    return Selectable;

});

/**
 日志：

 2010-10-29
 1. 考虑是否实现多选？若实现多选,将会大范围改动当前的设计
 不用实现多选
 2. value的设计,是否在初始化时形成一个value-item的map?

 2010-11-1
 1.selectable在IE浏览器下响应慢

 2010-11-3
 1.考虑在外部实现对filter后的结果cache，比如comboBox的query或者别的方法，先查询、cache再调用filter。
 2.fullItems命名考虑修改
 3.所有的操作需要增加自定义事件

 2010-11-8
 1.是否需要把value和selectedByValue合为一个方法

 2010-11-10
 1.添加通过selected class选中的方法
 */



/**
 * 下拉框
 * @module    combobox
 * @creator    清羽<qingyu@taobao.com> & 博玉<boyu@taobao.com>
 */
KISSY.add('gallery/selectable/1.0/combobox', function(S, Selectable) {
    var DOM = S.DOM, Event = S.Event,
        doc = document,
        COMBOBOX_CLS = 'ks-combobox',
        CLS_PREFIX = COMBOBOX_CLS + '-', DATA_PREFIX = 'ks-data-',
//		COMBOBOX_VALUE = COMBOBOX_CLS+'value-data',
//		TRIGGERACTIVE = CLS_PREFIX + 'trigger-active',
        VALUEINPUT_CLS = CLS_PREFIX + 'valueinput',
        SHIM_CLS = CLS_PREFIX + 'shim';

    function ComboBox(container, config) {
        var self = this;

        /**
         * 容器
         * @type HTMLElement
         */
        self.container = DOM.get(container);

        /**
         * 文本输入框
         * @type HTMLElement
         */
        //self.textInput;

        /**
         * 隐藏域
         * @type HTMLElement
         */
        //self.valueInput;

        /**
         * 触点
         * @type HTMLElement
         */
        //self.trigger;

        /**
         * 下拉框
         * @type HTMLElement | selectable
         * 下拉框默认结构如下
         * <div class="ks-combobox-droplist">
         *    <ul>
         *        <li ks-data-value="value1">list 1</li>
         *        <li ks-data-value="value2">list 2</li>
         *        <li ks-data-value="value3">list 3</li>
         *        <li ks-data-value="value4">list 4</li>
         *        <li ks-data-value="value5">list 5</li>
         *    </ul>
         * </div>
         */
        self.dropList = null;

        /**
         * 当前dropList是否显示
         * @type boolean
         */
        //self.dropList.isShow

        /**
         * 关闭dropList计时器
         * @type Object
         */
        //self.isClosing

        /**
         * combobox的选项
         * @type selectable
         */
        //self.selectable

        /**
         * select结构的选中值
         * @type String
         */
        self.selectValue = undefined;

        /**
         * 参数配置
         * @type Object
         */

        /**
         * 自身selectable的DOM结构引用
         * @type HTMLElement
         */
        //self.ul;

        /**
         * iframe shim 用于屏蔽ie6下bug
         * @type HTMLElement
         */
        //self.shim

        //调整配置信息
        config = config || {};

        self.config = S.merge(ComboBox.Config, config);

        self._init();
    }

    //默认配置
    ComboBox.Config = {

        //trigger 默认 class
        triggerCls    : CLS_PREFIX + 'trigger',

        //textInput 默认 class
        textInputCls : CLS_PREFIX + 'textinput',

        //dropList 默认 class
        dropListCls : CLS_PREFIX + 'droplist',

        // 获取值的属性
        valueKey : DATA_PREFIX + 'value',

        //是否需要添加ifame遮罩层
        shim : true,

        //将optionsData换成options
        //options data 如果传入options,则以options数据初始化dropList
        /* options 数据结构 为了和select.option中的值一致
         *  [
         *	  {value: 'value1', text: 'item 1'},
         *	  {value: 'value2', text: 'item 2'},
         *	  {value: 'value3', text: 'item 3'}
         *  ]
         */
        options : [],

        //自动过滤 或者说换成过滤条件
        autoFilter    :    true,

        //选中的item的class
        selectedItemCls: CLS_PREFIX + 'selected',

        //隐藏item的class,若不设置则使用display:none
        invisibleItemCls: undefined,

        //默认选中项索引值,默认选中第一个
        selectedIndex: 0
    };

    S.augment(ComboBox, Event.Target, {

        //初始化
        _init: function() {
            var self = this, cfg = self.config;

            if (self.container.tagName.toLowerCase() === 'select') {
                self.selectValue = self.container.value;
                self._parseSelect();
            } else {
                self._parseMarkup();
            }

            if (cfg.shim) {
                self._initShim();
            }
            self._initSelectable();
            self._setTextInput();
            self._bindEvent();

        },

        //解析select
        _parseSelect: function() {
            var self = this, cfg = self.config, select = self.container,
                //attributs,
                name = DOM.attr(select, 'name'),
                selectClass = DOM.attr(select, 'class'),
                selectId = DOM.attr(select, 'id'),
                comboboxContainer = DOM.create('<div class="' + COMBOBOX_CLS + '"></div>');

            //只继承来自select的id和class，其他属性忽略
            DOM.addClass(comboboxContainer, selectClass);
            DOM.attr(comboboxContainer, 'id', selectId);

            self.valueInput = DOM.create('<input name="' + name + '" class="' + VALUEINPUT_CLS + '" type="hidden"/>'),
                self.textInput = DOM.create('<input class="' + cfg.textInputCls + '" type="text"/>'),
                self.trigger = DOM.create('<span class="' + cfg.triggerCls + '"></span>'),

                comboboxContainer.appendChild(self.valueInput);
            comboboxContainer.appendChild(self.textInput);
            comboboxContainer.appendChild(self.trigger);
            self.container = comboboxContainer;

            DOM.insertBefore(self.container, select);
            //DOM.hide(select); 如果只是hide会影响在ie下显示的样式
            DOM.remove(select);

            cfg.options = S.makeArray(select.options);
            self._renderDropList();
        },

        //解析DOM结构
        _parseMarkup: function() {
            var self = this, cfg = self.config,
                container = self.container,
                children = container.children, node;
            for (var i = 0, len = children.length; i < len; i++) {
                node = children[i];
                switch (node.className) {
                    case VALUEINPUT_CLS:
                        self.valueInput = node;
                        break;
                    case cfg.textInputCls:
                        self.textInput = node;
                        break;
                    case cfg.triggerCls:
                        self.trigger = node;
                        break;
                    case cfg.dropListCls:
                        self.dropList = node;
                        break;
                }
            }
            //如果提供options,那么直接覆盖之前dropList,如果options是空数组,也直接转换
            self._renderDropList();
        },

        //解析options,并将dropList添加到container的最后一个节点上
        _renderDropList: function() {
            var self = this, cfg = self.config, dropListBody = '',
                options = cfg.options, valueKey = cfg.valueKey,
                option, dropListStr, container = self.container,
                prefix = '<div class="' + cfg.dropListCls + '"><ul>',
                suffix = '</ul></div>';

            if (self.dropList == null && S.isArray(cfg.options)) {
                //TODO:这里可以斟酌下是否用createElement方法和join方法提高效率
                for (var i = 0,len = options.length; i < len; i++) {
                    option = options[i];
                    dropListBody += '<li ' + valueKey + '="' + option.value + '">' + option.text + '</li>';
                }
                dropListStr = prefix + dropListBody + suffix;
                self.dropList = DOM.create(dropListStr);
            } else {
                container.removeChild(self.dropList);
            }

            //为dropList设置宽度
            DOM.css(self.dropList, 'width', self.textInput.offsetWidth);
            DOM.css(self.dropList, 'position', 'absolute');
            doc.body.appendChild(self.dropList);
            self.collapse();
        },

        /**
         * 设置dropList和shim的position
         */
        _positionDropList: function() {
            var self,dropList,shim,container,height,offset;
            self = this;
            dropList = self.dropList;
            shim = self.shim;
            container = self.container;
            height = DOM.height(container);
            offset = DOM.offset(container);

            offset.top += height;
            DOM.css(dropList, 'left', offset.left);
            DOM.css(dropList, 'top', offset.top);
            DOM.css(shim, 'left', offset.left);
            DOM.css(shim, 'top', offset.top);
        },

        //解析数据生成selectable
        _initSelectable: function() {
            var self = this, cfg = self.config,
                dropList = self.dropList,
                selectValue = self.selectValue;

            self.ul = dropList.getElementsByTagName('ul')[0];
            if (!!self.ul) {
                self.selectable = new Selectable(self.ul, {
                    valueKey            : cfg.valueKey,
                    selectedItemCls        : cfg.selectedItemCls,
                    invisibleItemCls    : cfg.invisibleItemCls,
                    selectedIndex        : cfg.selectedIndex
                });
            }

            //如果有初始化选中值,通过值选中item
            if (selectValue != undefined) {
                self.selectable.value(selectValue);
            }

            var item = self.selectable.item();
            if (item != null & item != undefined) {
                self.textInput.value = self.selectable.item().innerHTML;
            }
        },

        //给容器添加iframe shim 层
        _initShim: function() {
            var self = this;
            self.shim = DOM.create('<iframe class="' + SHIM_CLS + '" style="display:none;position:absolute;border:none;filter:alpha(opacity=0);"></iframe>');
            doc.body.appendChild(self.shim);
        },

        //设置shim的区域大小，为了方便filter时，dropList的变化
        _setShimRegion: function() {
            var self = this, dropList = self.dropList,
                width = DOM.width(dropList),
                height = DOM.height(dropList);
            DOM.width(self.shim, width);
            DOM.height(self.shim, height);
        },

        //combobox的事件绑定
        _bindEvent: function() {
            var self = this, cfg = self.config, textInput = self.textInput,
                //selectable = self.selectable,
                pressingCount = 0, tempText;

            //TODO:回车事件,上,下按钮事件
            Event.on(textInput, 'keydown', function(ev) {
                var keyCode = ev.keyCode;

                // ESC 键，隐藏dropList
                if (keyCode === 27) {
                    self.collapse();
                } else if (keyCode === 40 || keyCode === 38) {
                    if (pressingCount++ === 0) {
                        self._selectItem(keyCode === 40);
                    } else if (pressingCount == 3) {
                        pressingCount = 0;
                    }
                    self._setTextInput();
                } else if (keyCode === 13) {
                    self._setTextInput();
                    self.collapse();
                } else if (keyCode != 9) {//如果不是tab切换键
                    if (!self.dropList.isShow) {
                        self.expand();
                    }
                }

                tempText = textInput.value;

            });

            Event.on(textInput, 'keyup', function() {
                var text = textInput.value;
                // reset pressingCount
                pressingCount = 0;

                //判断输入是否有改变,如果改变就filter
                if (tempText != text) {
                    self.selectable.clearFilter();
                    self.selectable.filter(function(item) {
                        return item.innerHTML.indexOf(text) == 0;
                    });
                }
            });

            //这里应该是点击cotainer？
            Event.on(self.trigger, 'click', function() {
                self.textInput.focus();
                self.textInput.select();
                if (self.dropList.isShow) {
                    self.collapse();
                } else {
                    //clearTimeout(self.isClosing);
                    self.selectable.clearFilter();
                    self.expand();
                }
            });

            Event.on(self.textInput, 'blur', function() {
                //self.isClosing = setTimeout(function() {
                //	self.collapse();
                //}, 150);
            });

            Event.on(self.dropList, 'click', function(e) {
                var target = e.target, value;
                if (target.tagName.toLowerCase() == 'li') {
                    value = DOM.attr(target, cfg.valueKey);
                    self.selectable.value(value);
                    self._setTextInput();
                    self.collapse();
                }
            });

            Event.on(self.dropList, 'mouseover', function(e) {
                var target = e.target, value;
                if (target.tagName.toLowerCase() == 'li') {
                    value = DOM.attr(target, cfg.valueKey);
                    self.selectable.value(value);
                }
            });

        },

        /**
         * 选中提示层中的上/下一个条
         * @param {Boolean} down true 表示 down, false 表示 up
         */
        _selectItem: function(down) {
            var self = this,
                selectable = self.selectable;

            if (down) {
                selectable.next();
            } else {
                selectable.prev();
            }
        },

        //为combobox设值
        _setTextInput: function() {
            var self = this,
                value = self.selectable.value(),
                item = self.selectable.item();
            if (item != null && item != undefined) {
                self.textInput.value = item.innerHTML;
            }
            if (value != undefined && value != null) {
                self.valueInput.value = self.selectable.value();
            } else {
                self.valueInput.value = '';
            }
        },

        //添加option,传入的是对象{value:'aa',text:'bb'}
        add: function(option) {
            var self = this, ul = self.ul,
                cfg = self['cfg'],
                item, itemStr,
                selectedIndex = self.selectable.selectedIndex;

            //在结构中添加节点,同时生成新的selectable
            if (S.isPlainObject(option) && !!ul) {
                itemStr = '<li ' + cfg.valueKey + '=' + option.value + ' >' + option.text + '</li>';
                item = DOM.create(itemStr);
                self.ul.appendChild(item);
                self.selectable = new Selectable(ul, {
                    valueKey            : cfg.valueKey,
                    selectedItemCls        : cfg.selectedItemCls,
                    invisibleItemCls    : cfg.invisibleItemCls,
                    selectedIndex        : selectedIndex
                });
            }
        },

        //删除option
        remove: function(index) {
            var self = this,
                cfg = self['cfg'],
                ul = self.ul;
            //selectIndex = self.selectable.selectedIndex


            if (S.isNumber(index) && !!ul) {
                ul.remove(ul.children[index]);
            }

            self.selectable = new Selectable(ul, {
                valueKey            : cfg.valueKey,
                selectedItemCls        : cfg.selectedItemCls,
                invisibleItemCls    : cfg.invisibleItemCls,
                selectedIndex        : selectedIndex
            });
        },

        //将键盘焦点转移到textInput上
        focus: function() {
            //暂时不实现
        },

        disable: function(type) {
        },

        //移除键盘焦点
        blur: function() {
            //暂时不实现
        },

        //展开
        expand: function() {
            var self = this;

            self._positionDropList();
            DOM.show(self.dropList);
            DOM.show(self.shim);
            self._setShimRegion();

            self.dropList.isShow = true;
        },

        //收起
        collapse: function() {
            var self = this;

            DOM.hide(self.dropList);
            DOM.hide(self.shim);

            self.dropList.isShow = false;
        },

        //通过value查找并赋值,或者获取combobox的当前选中值
        //TODO:需不需要clearfilter一次
        value: function(value) {
            var self = this, index,
                ul = self.ul, item;
            if (value != undefined && value != null) {
                //有值则赋值
                self.textInput.value = value;
                for (var i = 0, len = ul.children.length; i < len; i++) {
                    item = ul.children[i];
                    if (S.trim(value) == S.trim(item.innerHTML)) {
                        index = i;
                        break;
                    }
                }
                self.selectable.index(index);
            } else {
                //没值,获取当前选中值

            }
        }
    });

    return ComboBox;

}, { requires:["./base"]});

/**
 日志:

 2010-11-8
 1.combobox不过多的关注selectable的样式,可以根据默认结构结合数据生成selectable?
 2.keyup的时候filter一次selectable
 3.dropList需要考虑被遮罩的情况,加上iframe
 4.支持select自动转换
 5.dropList的宽度、高度、显示item条数等问题,
 6.dropList是否考虑在页面中单例一个div,每次去取dropList中的结构？
 7.键盘插件
 8.dropList位置是否每次show时需要计算
 9.dropList滚动条问题
 10.add remove方法问题

 2010-11-9
 1.dropList中的ul是个selectable,那这个selectable和dropList应该是个怎样的关系
 2.需不需要在创建dropList后给它个id同时赋予combobox某个属性
 3.初始化参数,如何处理,是在节点上添加selected属性还是配置config（两个都需要）
 4.select转换为combo的时候是否有必要将其所有属性都copy到combobox上？
 5.如果用户提供select那么我们是将之前提供的select隐藏掉还是删除掉？

 2010-11-10
 1.提供disable方法
 2.是否有必要将初始化选中值暴露给用户

 combobox初始化逻辑
 1.提供结构是select
 直接通过select创建HTML结构,同时将之前的select隐藏掉
 2.提供的是HTML结构
 (1).如果提供options,,尝试通过config.dropListCls去获取dropList,并通过options初始化dropList覆盖掉之前的dropList
 (2).如果没有提供options,尝试通过config.dropListCls去获取dropList
 3.既没提供dropList HTML结构又没提供options又不是select
 直接生成空ul插入dropList

 selectable初始化逻辑
 1.如果是select
 (1).用户有默认选中值,我们通过默认选中值去执行value方法让combobox有默认选中值
 (2).用户没有默认选中值,那么我们默认选中第一项
 2.如果是HTML结构
 (1).用户在结构中默认提供selected class属性,那么用用户提供的selected项的第一项作为默认选项,并移除别的项的selected class属性
 (2).用户没有默认选中值,默认选中第一项

 2010-11-11:
 1.添加hidden input 在生成的时候赋予name属性
 2.在写完后将注释全改下
 3.dropList上浮 自动？

 2010-11-12:
 1.dropList弹出和消失还有问题，需要再仔细考虑下
 */


KISSY.add("gallery/selectable/1.0/index", function(S,Selectable, ComboBox){
    return {
        Selectable: Selectable,
        ComboBox: ComboBox
    };
},{
    requires:["./base", "./combobox"]
});
