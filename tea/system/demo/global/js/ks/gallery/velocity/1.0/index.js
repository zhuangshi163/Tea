KISSY.add('gallery/velocity/1.0/index', function(S){
  var Velocity = function(asts){
    this.asts = asts;
    this.init();
  };
  Velocity.Helper = {};
  Velocity.prototype = {
    constructor: Velocity
  };

  var hasEnumBug = !({toString: 1}.propertyIsEnumerable('toString'));

  var keys = Object.keys || function (o) {
    var result = [], p, i;

    for (p in o) {
      result.push(p);
    }

    if (hasEnumBug) {
      for (i = enumProperties.length - 1; i >= 0; i--) {
        p = enumProperties[i];
        if (o.hasOwnProperty(p)) {
          result.push(p);
        }
      }
    }

    return result;
  };

  //api map
  var utils = {
    forEach : S.each,
    some    : S.some,
    mixin   : S.mix,
    guid    : S.guid,
    isArray : S.isArray,
    indexOf : S.indexOf,
    // 1.2没有keys方法，考虑独立utils
    keys    : keys,
    now     : S.now
  };

  !function(Helper, utils){
  /**
   * 获取引用文本，当引用自身不存在的情况下，需要返回原来的模板字符串
   */
  function getRefText(ast){

    var ret = ast.leader;
    var isFn = ast.args !== undefined;

    if (ast.isWraped) ret += '{';

    if (isFn) {
      ret += getMethodText(ast);
    } else {
      ret += ast.id;
    }

    utils.forEach(ast.path, function(ref){
      //不支持method并且传递参数
      if (ref.type == 'method') {
        ret += '.' + getMethodText(ref);
      } else if (ref.type == 'index') {

        var text = '';
        var id = ref.id;

        if (id.type === 'integer') {

          text = id.value;

        } else if (id.type === 'string') {

          var sign = id.isEval? '"': "'";
          text = sign + id.value + sign;

        } else {

          text = getRefText(id);

        }

        ret += '[' + text + ']';

      } else if (ref.type == 'property') {

        ret += '.' + ref.id;

      }

    }, this);

    if (ast.isWraped) ret += '}';

    return ret;
  }

  function getMethodText(ref) {

    var args = [];
    var ret = '';

    utils.forEach(ref.args, function(arg){

      if (arg.type === 'string') {

        var sign = arg.isEval? '"': "'";
        var text = sign + arg.value + sign;
        args.push(text);

      } else {

        args.push(getRefText(arg));

      }

    });

    ret += ref.id + '(' + args.join(',') + ')';

    return ret;

  }

  Helper.getRefText = getRefText;
}(Velocity.Helper, utils);
  /** file: ./src/compile/blocks.js*/
!function(Velocity, utils){
  /**
   * blocks语法处理
   */
  utils.mixin(Velocity.prototype, {
    /**
     * 处理代码库: if foreach macro
     */
    getBlock: function(block) {
      var ast = block[0];
      var ret = '';
      var _block = [ast];
      var _inBlock = [];
      var index = 0;
      var blockTypes = ['if', 'foreach', 'macro', 'noescape'];

      /**
       * 处理block嵌套，重新构造_block，把block中有嵌套的放入数组_inBlock,
       * _inBlock 最后成为_block的一个元素，_inBlock数组作为一个block数组，求值
       * 过程中，可以通过递归求值，进入下一层嵌套
       */
      utils.forEach(block, function(ast, i){
        if (i) {
          if (utils.indexOf(ast.type, blockTypes) !== -1) {
            index ++;
            _inBlock.push(ast);
          } else if (ast.type === 'end') {
            index --;
            if (index) {
              _inBlock.push(ast);
            } else {
              _block.push(_inBlock.slice());
              _inBlock = [];
            }
          } else {
            index ? _inBlock.push(ast) : _block.push(ast);
          }
        }
      });

      if (ast.type === 'if') {
        ret = this.getBlockIf(_block);
      } else if (ast.type === 'foreach') {
        ret = this.getBlockEach(_block);
      } else if (ast.type === 'macro') {
        this.setBlockMacro(_block);
      } else if (ast.type === 'noescape') {
        ret = this._render(_block.slice(1));
      }

      return ret;
    },

    /**
     * define macro
     */
    setBlockMacro: function(block){
      var ast = block[0];
      var _block = block.slice(1);
      var macros = this.macros;

      macros[ast.id] = {
        asts: _block,
        args: ast.args
      };
    },

    /**
     * parse macro call
     */
    getMacro: function(ast){
      var macro = this.macros[ast.id];
      var ret = '';

      if (!macro) {
        ret = '';
      } else {
        var asts = macro.asts;
        var args = macro.args;
        var _call_args = ast.args;
        var local = {};
        var localKey = [];
        var guid = utils.guid();
        var contextId = ast.id + ':' + guid;

        utils.forEach(args, function(ref, i){
          if (_call_args[i]) {
            local[ref.id] = this.getLiteral(_call_args[i]);
          } else {
            local[ref.id] = undefined;
          }
        }, this);

        this.local[contextId] = local;
        ret = this._render(asts, contextId);
        this.local[contextId] = {};
        this.conditions.pop();
        this.condition = '';
      }

      return ret;
    },

    /**
     * parse #foreach
     */
    getBlockEach: function(block){

      var ast = block[0];
      var _from = this.getLiteral(ast.from);
      var _block = block.slice(1);
      var _to = ast.to;
      var local = {
        foreach: {
          count: 0
        }
      };
      var ret = '';
      var guid = utils.guid();
      var contextId = 'foreach:' + guid;

      if (!_from) return;

      var len = utils.isArray(_from)? _from.length: utils.keys(_from).length;

      utils.forEach(_from, function(val, i){

        if (this.setBreak) return;
        //构造临时变量
        local[_to] = val;
        //TODO: here, the foreach variable give to local, when _from is not an
        //array, count and hasNext would be undefined, also i is not the
        //index.
        local['foreach']['count'] = i + 1;
        local['foreach']['index'] = i;
        local['foreach']['hasNext'] = i + 1 < len;
        this.local[contextId] = local;
        ret += this._render(_block, contextId);

      }, this);

      this.setBreak = false;
      //删除临时变量
      this.local[contextId] = {};
      this.conditions.pop();
      this.condition = '';

      return ret;

    },

    /**
     * parse #if
     */
    getBlockIf: function(block) {

      var str = '';
      var received = false;
      var asts = [];

      utils.some(block, function(ast){

        if (ast.condition) {

          if (received) return true;
          received = this.getExpression(ast.condition);

        } else if (ast.type === 'else') {
          if (received) return true;
          received = true;
        } else if (received) {
          asts.push(ast);
        }

        return false;

      }, this);

      return this._render(asts);
    }
  });
}(Velocity, utils);

/** file: ./src/compile/compile.js*/
!function(Velocity, utils){
  var BLOCK_TYPES = ['if', 'foreach', 'macro', 'noescape'];
  /**
   * compile
   */
  utils.mixin(Velocity.prototype, {
    init: function(){
      this.context = {};
      this.macros = {};
      this.conditions = [];
      this.local = {};

      utils.forEach(this.asts, this._init, this);
    },

    _init: function(ast, i){
      if (!ast.type || ast.type !== 'references') {
        this._trim(i + 1);
      }
    },

    /**
     * 删除多余的换行符，规则，所有非references的指令后面的换行符，都去除接下来的
     * 换行符
     */
    _trim: function(i){
      var asts = this.asts;
      var _ast = asts[i];
      if (typeof _ast === 'string' && _ast.slice(0, 1) === "\n") {
        asts[i] = _ast.slice(1);
      }
    },

    render: function(context){

      this.context = context || {};
      var t1 = utils.now();
      var str = this._render();
      var t2 = utils.now();
      var cost = t2 - t1;

      this.cost = cost;

      return str ;
    },

    /**
     * 解析入口函数
     * @param ast {array} 模板结构数组
     * @param contextId {number} 执行环境id，对于macro有局部作用域，变量的设置和
     * 取值，都放在一个this.local下，通过contextId查找
     * @return {string}解析后的字符串
     */
    _render: function(asts, contextId){

      var str = '';
      var block = [];
      var index = 0;
      asts = asts || this.asts;
      if (contextId) {
        if (contextId !== this.condition) this.conditions.push(contextId);
        this.condition = contextId;
      } else {
        this.condition = null;
      }

      utils.forEach(asts, function(ast){
        var type = ast.type;

        //foreach if macro时，index加一
        if (utils.indexOf(type, BLOCK_TYPES) > -1) index ++;

        if (type === 'comment') return;

        if (index) {
          type === 'end' && index--;
          if (index) {
            block.push(ast);
            return;
          }
        }

        switch(type) {
          case 'references':
          str += this.getReferences(ast, true);
          break;

          case 'set':
          this.setValue(ast);
          break;

          case 'break':
          this.setBreak = true;
          break;

          case 'macro_call':
          str += this.getMacro(ast);
          break;

          case 'end':
          //使用slide获取block的拷贝
          str += this.getBlock(block.slice());
          block = [];
          break;

          default:
          if (utils.isArray(ast)) {
            str += this.getBlock(ast);
          } else {
            str += ast;
          }
          break;
        }
      }, this);

      return str;
    }
  });
}(Velocity, utils);

/** file: ./src/compile/expression.js*/
!function(Velocity, utils){
  /**
   * expression运算
   */
  utils.mixin(Velocity.prototype, {
    /**
     * 表达式求值，表达式主要是数学表达式，逻辑运算和比较运算，到最底层数据结构，
     * 基本数据类型，使用 getLiteral求值，getLiteral遇到是引用的时候，使用
     * getReferences求值
     */
    getExpression: function(ast){

      var exp = ast.expression;
      var ret;
      if (ast.type === 'math') {

        switch(ast.operator) {
          case '+':
          ret = this.getExpression(exp[0]) + this.getExpression(exp[1]);
          break;

          case '-':
          ret = this.getExpression(exp[0]) - this.getExpression(exp[1]);
          break;

          case '/':
          ret = this.getExpression(exp[0]) / this.getExpression(exp[1]);
          break;

          case '*':
          ret = this.getExpression(exp[0]) * this.getExpression(exp[1]);
          break;

          case '||':
          ret = this.getExpression(exp[0]) || this.getExpression(exp[1]);
          break;

          case '&&':
          ret = this.getExpression(exp[0]) && this.getExpression(exp[1]);
          break;

          case '>':
          ret = this.getExpression(exp[0]) > this.getExpression(exp[1]);
          break;

          case '<':
          ret = this.getExpression(exp[0]) < this.getExpression(exp[1]);
          break;

          case '==':
          ret = this.getExpression(exp[0]) == this.getExpression(exp[1]);
          break;

          case '!=':
          ret = this.getExpression(exp[0]) != this.getExpression(exp[1]);
          break;

          case 'minus':
          ret = - this.getExpression(exp[0]);
          break;

          case 'not':
          ret = !this.getExpression(exp[0]);
          break;

          case 'parenthesis':
          ret = this.getExpression(exp[0]);
          break;

          default:
          return;
          // code
        }

        return ret;
      } else {
        return this.getLiteral(ast);
      }
    }
  });
}(Velocity, utils);

/** file: ./src/compile/literal.js*/
!function(Velocity, utils){
  /**
   * literal解释模块
   * @require {method} getReferences
   */
  utils.mixin(Velocity.prototype, {
    /**
     * 字面量求值，主要包括string, integer, array, map四种数据结构
     * @param literal {object} 定义于velocity.yy文件，type描述数据类型，value属性
     * 是literal值描述
     * @return {object|string|number|array}返回对应的js变量
     */
    getLiteral: function(literal){

      var type = literal.type;
      var ret = '';

      if (type == 'string') {

        ret = this.getString(literal);

      } else if (type == 'integer') {

        ret = parseInt(literal.value, 10);

      } else if (type == 'array') {

        ret = this.getArray(literal);

      } else if(type == 'map') {

        ret = {};
        var map = literal.value;

        utils.forEach(map, function(exp, key){
          ret[key] = this.getLiteral(exp);
        }, this);
      } else if(type == 'bool') {

        if (literal.value === "null") {
          ret = null;
        } else if (literal.value === 'false') {
          ret = false;
        } else if (literal.value === 'true') {
          ret = true;
        }

      } else {

        return this.getReferences(literal);

      }

      return ret;
    },

    /**
     * 对字符串求值，对已双引号字符串，需要做变量替换
     */
    getString: function(literal){
      var val = literal.value;
      var ret = val;

      if (literal.isEval && (val.indexOf('#') !== -1 || val.indexOf("$") !== -1)) {
        ret = this.evalStr(val);
      }

      return ret;
    },

    /**
     * 对array字面量求值，比如[1, 2]=> [1,2]，[1..5] => [1,2,3,4,5]
     * @param literal {object} array字面量的描述对象，分为普通数组和range数组两种
     * ，和js基本一致
     * @return {array} 求值得到的数组
     */
    getArray: function(literal){

      var ret = [];

      if (literal.isRange) {
        var begin = parseInt(literal.value[0], 10);
        var end   = parseInt(literal.value[1], 10);
        var i;

        if (begin < end) {
          for (i = begin; i <= end; i++) ret.push(i);
        } else {
          for (i = begin; i >= end; i--) ret.push(i);
        }

      } else {
        utils.forEach(literal.value, function(exp){
          ret.push(this.getLiteral(exp));
        }, this);
      }

      return ret;
    },

    /**
     * 对双引号字符串进行eval求值，替换其中的变量，只支持最基本的变量类型替换
     */
    evalStr: function(str){
      var ret = str;
      var reg = /\$\{{0,1}([a-z][a-z_\-0-9.]*)\}{0,1}/gi;
      var self = this;
      ret = ret.replace(reg, function(){
        return self._getFromVarname(arguments[1]);
      });
      return ret;
    },

    /**
     * 通过变量名获取变量的值
     * @param varname {string} 变量名，比如$name.name，只支持一种形式，变量和属性
     * 的取值，index和method不支持，在字符处理中，只处理"$varname1 $foo.bar" 类似
     * 的变量，对于复杂类型不支持
     * @return ret {string} 变量对应的值
     */
    _getFromVarname: function(varname){
      var varPath = varname.split('.');
      var ast = {
        type   : "references",
        id     : varPath[0],
        leader : "$"
      };

      var path = [];
      for (var i=1; i < varPath.length; i++) {
        path.push({
          type: 'property',
          id: varPath[i]
        });
      }

      if (path.length) ast.path = path;
      return this.getReferences(ast);
    }

  });
}(Velocity, utils);

/** file: ./src/compile/references.js*/
!function(Velocity, utils){
  utils.mixin(Velocity.prototype, {
    /**
     * 引用求值
     * @param {object} ast 结构来自velocity.yy
     * @param {bool} isVal 取值还是获取字符串，两者的区别在于，求值返回结果，求
     * 字符串，如果没有返回变量自身，比如$foo
     */
    getReferences: function(ast, isVal) {

      var isSilent = ast.leader === "$!";
      var isfn     = ast.args !== undefined;
      var context  = this.context;
      var ret      = context[ast.id];
      var local    = this.getLocal(ast);


      if (ret !== undefined && isfn) {
        ret = this.getPropMethod(ast, context);
      }

      if (local.isLocaled) ret = local['value'];

      // 如果是$page.setTitle('xx')类似的方法，需要设置page为对象
      var isSet = this.hasSetMethod(ast, ret);
      if (isSet !== false) {
        if (!context[ast.id]) context[ast.id] = {};
        utils.mixin(context[ast.id], isSet);
        return '';
      }

      if (ast.path && ret !== undefined) {
        utils.some(ast.path, function(property, i){
          ret = this.getAttributes(property, ret);
          return ret === undefined;
        }, this);
      }

      if (isVal && ret === undefined) ret = isSilent? '' : Velocity.Helper.getRefText(ast);
      return ret;
    },

    /**
     * set方法需要单独处理，假设set只在references最后$page.setTitle('')
     * 对于set连缀的情况$page.setTitle('sd').setName('haha')
     */
    hasSetMethod: function(ast, context){
      var len = ast.path && ast.path.length;
      if (!len) return false;

      var lastId = '' + ast.path[len - 1].id;

      if (lastId.indexOf('set') !== 0) {
        return false;
      } else {

        context = context || {};
        utils.forEach(ast.path, function(ast){
          if (ast.type === 'method' && ast.id.indexOf('set') === 0) {
            context[ast.id.slice(3)] = this.getLiteral(ast.args[0]);
          } else {
            context[ast.id] = context[ast.id] || {};
          }
        }, this);

        return context;
      }
    },

    /**
     * 获取局部变量，在macro和foreach循环中使用
     */
    getLocal: function(ast){

      var id = ast.id;
      var local = this.local;
      var ret = false;

      var isLocaled = utils.some(this.conditions, function(contextId){
        var _local = local[contextId];
        if (id in _local) {
          ret = _local[id];
          return true;
        }

        return false;
      }, this);

      return {
        value: ret,
        isLocaled: isLocaled
      };
    },
    /**
     * $foo.bar 属性求值
     */
    getAttributes: function(property, baseRef){
      /**
       * type对应着velocity.yy中的attribute，三种类型: method, index, property
       */
      var type = property.type;
      var ret;
      var id = property.id;
      if (type === 'method'){
        ret = this.getPropMethod(property, baseRef);
      } else if (type === 'property') {
        ret = baseRef[id];
      } else {
        ret = this.getPropIndex(property, baseRef);
      }
      return ret;
    },

    /**
     * $foo.bar[1] index求值
     */
    getPropIndex: function(property, baseRef){
      var ast = property.id;
      var key;
      if (ast.type === 'references'){
        key = this.getReferences(ast);
      } else if(ast.type === 'integer'){
        key = ast.value;
      } else {
        key = ast.value;
      }

      var ret;
      ret = baseRef[key];

      return ret;
    },

    /**
     * $foo.bar()求值
     */
    getPropMethod: function(property, baseRef){

      var id         = property.id;
      var ret        = '';
      var _id        = id.slice(3);
      //特殊方法
      var specialFns = ['keySet'];

      if (id.indexOf('get') === 0) {

        if (_id) {
          ret = baseRef[_id];
        } else {
          //map 对应的get方法
          _id = this.getLiteral(property.args[0]);
          ret = baseRef[_id];
        }

      } else if (id.indexOf('is') === 0) {

        _id = id.slice(2);
        ret = baseRef[_id];

      } else if (id === 'keySet') {
        ret = utils.keys(baseRef);
      } else {

        ret = baseRef[id];
        var args = [];

        utils.forEach(property.args, function(exp){
          args.push(this.getLiteral(exp));
        }, this);

        if (ret && ret.call) {
          ret = ret.apply(baseRef, args); 
        } else {
          ret = undefined;
        }
      }

      return ret;
    }
  });
}(Velocity, utils);

/** file: ./src/compile/set.js*/
!function(Velocity, utils){
  /**
   * 变量设置
   */
  utils.mixin(Velocity.prototype, {
    /**
     * 获取执行环境，对于macro中定义的变量，为局部变量，不贮存在全局中，执行后销毁
     */
    getContext: function(){
      var condition = this.condition;
      var local = this.local;
      if (condition) {
        return local[condition];
      } else {
        return this.context;
      }
    },
    /**
     * parse #set
     */
    setValue: function(ast){
      var ref = ast.equal[0];
      var context  = this.getContext();
      var valAst = ast.equal[1];
      var val;

      if (valAst.type === 'math') {
        val = this.getExpression(valAst);
      } else {
        val = this.getLiteral(ast.equal[1]);
      }

      if (!ref.path) {

        context[ref.id] = val;

      } else {

        var baseRef = context[ref.id];
        if (typeof baseRef != 'object') {
          baseRef = {};
        }

        context[ref.id] = baseRef;
        var len = ref.path ? ref.path.length: 0;

        //console.log(val);
        utils.forEach(ref.path, function(exp, i){

          var isEnd = len === i + 1;
          var key = exp.id;
          if (exp.type === 'index')  key = key.value;
          baseRef[key] = isEnd? val: {};
          baseRef = baseRef[key];

        });

      }
    }
  });
}(Velocity, utils);


  return Velocity;
});
KISSY.add('gallery/velocity/1.0/parse', function(S){    /* Jison generated parser */
var velocity = (function(){
var parser = {trace: function trace() { },
yy: {},
symbols_: {"error":2,"root":3,"program":4,"EOF":5,"statements":6,"statement":7,"references":8,"directives":9,"content":10,"COMMENT":11,"set":12,"if":13,"elseif":14,"else":15,"end":16,"foreach":17,"break":18,"include":19,"parse":20,"evaluate":21,"define":22,"HASH":23,"NOESCAPE":24,"PARENTHESIS":25,"CLOSE_PARENTHESIS":26,"macro":27,"macro_call":28,"SET":29,"equal":30,"IF":31,"expression":32,"ELSEIF":33,"ELSE":34,"END":35,"FOREACH":36,"DOLLAR":37,"ID":38,"IN":39,"array":40,"BREAK":41,"INCLUDE":42,"params":43,"PARSE":44,"string":45,"EAVL":46,"DEFINE":47,"MACRO":48,"macro_args":49,"macro_call_args":50,"literal":51,"arguments":52,"EQUAL":53,"map":54,"math":55,"||":56,"&&":57,"+":58,"-":59,"*":60,"/":61,">":62,"<":63,"==":64,"!=":65,"parenthesis":66,"!":67,"brace_begin":68,"attributes":69,"brace_end":70,"methodbd":71,"VAR_BEGIN":72,"MAP_BEGIN":73,"VAR_END":74,"MAP_END":75,"attribute":76,"method":77,"index":78,"property":79,"DOT":80,"literals":81,"COMMA":82,"CONTENT":83,"BRACKET":84,"CLOSE_BRACKET":85,"integer":86,"BOOL":87,"INTEGER":88,"STRING":89,"EVAL_STRING":90,"RANGE":91,"map_item":92,"MAP_SPLIT":93,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",11:"COMMENT",23:"HASH",24:"NOESCAPE",25:"PARENTHESIS",26:"CLOSE_PARENTHESIS",29:"SET",31:"IF",33:"ELSEIF",34:"ELSE",35:"END",36:"FOREACH",37:"DOLLAR",38:"ID",39:"IN",41:"BREAK",42:"INCLUDE",44:"PARSE",46:"EAVL",47:"DEFINE",48:"MACRO",53:"EQUAL",56:"||",57:"&&",58:"+",59:"-",60:"*",61:"/",62:">",63:"<",64:"==",65:"!=",67:"!",72:"VAR_BEGIN",73:"MAP_BEGIN",74:"VAR_END",75:"MAP_END",80:"DOT",82:"COMMA",83:"CONTENT",84:"BRACKET",85:"CLOSE_BRACKET",87:"BOOL",88:"INTEGER",89:"STRING",90:"EVAL_STRING",91:"RANGE",93:"MAP_SPLIT"},
productions_: [0,[3,2],[4,1],[6,1],[6,2],[7,1],[7,1],[7,1],[7,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,4],[9,1],[9,1],[12,5],[13,5],[14,5],[15,2],[16,2],[17,8],[17,8],[18,2],[19,5],[20,5],[21,6],[22,6],[27,6],[27,5],[49,1],[49,2],[28,5],[28,4],[50,1],[50,1],[50,1],[50,2],[50,2],[52,2],[52,3],[30,3],[32,1],[32,1],[32,1],[55,3],[55,3],[55,3],[55,3],[55,3],[55,3],[55,3],[55,3],[55,3],[55,3],[55,1],[55,2],[55,2],[55,1],[55,1],[66,3],[8,5],[8,3],[8,5],[8,3],[8,2],[8,4],[8,2],[8,4],[68,1],[68,1],[70,1],[70,1],[69,1],[69,2],[76,1],[76,1],[76,1],[77,2],[71,4],[71,3],[43,1],[43,1],[43,3],[43,3],[79,2],[79,2],[78,3],[78,3],[78,3],[78,2],[78,2],[51,1],[51,1],[51,1],[86,1],[86,2],[45,1],[45,1],[81,1],[81,1],[81,1],[40,3],[40,5],[40,2],[54,3],[92,3],[92,3],[92,5],[92,5],[10,1],[10,1],[10,2],[10,3],[10,3]],
performAction: function anonymous(yytext,yyleng,yylineno,yy,yystate,$$,_$) {

var $0 = $$.length - 1;
switch (yystate) {
case 1: return $$[$0-1]; 
break;
case 2: this.$ = $$[$0]; 
break;
case 3: this.$ = [$$[$0]]; 
break;
case 4: this.$ = [].concat($$[$0-1], $$[$0]); 
break;
case 5: this.$ = $$[$0]; 
break;
case 6: this.$ = $$[$0]; 
break;
case 7: this.$ = $$[$0]; 
break;
case 8: this.$ = {type: 'comment', value: $$[$0] }; 
break;
case 9: this.$ = $$[$0]; 
break;
case 10: this.$ = $$[$0]; 
break;
case 11: this.$ = $$[$0]; 
break;
case 12: this.$ = $$[$0]; 
break;
case 13: this.$ = $$[$0]; 
break;
case 14: this.$ = $$[$0]; 
break;
case 15: this.$ = $$[$0]; 
break;
case 16: this.$ = $$[$0]; 
break;
case 17: this.$ = $$[$0]; 
break;
case 18: this.$ = $$[$0]; 
break;
case 19: this.$ = $$[$0]; 
break;
case 20: this.$ = { type: 'noescape' }; 
break;
case 21: this.$ = $$[$0]; 
break;
case 22: this.$ = $$[$0]; 
break;
case 23: this.$ = {type: 'set', equal: $$[$0-1] }; 
break;
case 24: this.$ = {type: 'if', condition: $$[$0-1] }; 
break;
case 25: this.$ = {type: 'elseif', condition: $$[$0-1] }; 
break;
case 26: this.$ = {type: 'else' }; 
break;
case 27: this.$ = {type: 'end' }; 
break;
case 28: this.$ = {type: 'foreach', to: $$[$0-3], from: $$[$0-1] }; 
break;
case 29: this.$ = {type: 'foreach', to: $$[$0-3], from: $$[$0-1] }; 
break;
case 30: this.$ = {type: $$[$0] }; 
break;
case 31: this.$ = {type: 'include', args: $$[$0-1] }; 
break;
case 32: this.$ = {type: 'parse', id: $$[$0-1] }; 
break;
case 33: this.$ = {type: 'evaluate', id: $$[$0-1] }; 
break;
case 34: this.$ = {type: 'define', id: $$[$0-1] }; 
break;
case 35: this.$ = {type: 'macro', id: $$[$0-2], args: $$[$0-1] }; 
break;
case 36: this.$ = {type: 'macro', id: $$[$0-1] }; 
break;
case 37: this.$ = [$$[$0]]; 
break;
case 38: this.$ = [].concat($$[$0-1], $$[$0]); 
break;
case 39: this.$ = {type:"macro_call", id: $$[$0-3], args: $$[$0-1] }; 
break;
case 40: this.$ = {type:"macro_call", id: $$[$0-2] }; 
break;
case 41: this.$ = [$$[$0]]; 
break;
case 42: this.$ = [$$[$0]]; 
break;
case 43: this.$ = [$$[$0]]; 
break;
case 44: this.$ = [].concat($$[$0-1], $$[$0]); 
break;
case 45: this.$ = [].concat($$[$0-1], $$[$0]); 
break;
case 46: this.$ = $$[$0]; 
break;
case 47: this.$ = [].concat($$[$0-2], $$[$0]); 
break;
case 48: this.$ = [$$[$0-2], $$[$0]]; 
break;
case 49: this.$ = $$[$0]; 
break;
case 50: this.$ = $$[$0]; 
break;
case 51: this.$ = $$[$0]; 
break;
case 52: this.$ = {type: 'math', expression: [$$[$0-2], $$[$0]], operator: $$[$0-1] }; 
break;
case 53: this.$ = {type: 'math', expression: [$$[$0-2], $$[$0]], operator: $$[$0-1] }; 
break;
case 54: this.$ = {type: 'math', expression: [$$[$0-2], $$[$0]], operator: $$[$0-1] }; 
break;
case 55: this.$ = {type: 'math', expression: [$$[$0-2], $$[$0]], operator: $$[$0-1] }; 
break;
case 56: this.$ = {type: 'math', expression: [$$[$0-2], $$[$0]], operator: $$[$0-1] }; 
break;
case 57: this.$ = {type: 'math', expression: [$$[$0-2], $$[$0]], operator: $$[$0-1] }; 
break;
case 58: this.$ = {type: 'math', expression: [$$[$0-2], $$[$0]], operator: $$[$0-1] }; 
break;
case 59: this.$ = {type: 'math', expression: [$$[$0-2], $$[$0]], operator: $$[$0-1] }; 
break;
case 60: this.$ = {type: 'math', expression: [$$[$0-2], $$[$0]], operator: $$[$0-1] }; 
break;
case 61: this.$ = {type: 'math', expression: [$$[$0-2], $$[$0]], operator: $$[$0-1] }; 
break;
case 62: this.$ = $$[$0]; 
break;
case 63: this.$ = {type: 'math', expression: [$$[$0]], operator: 'minus' }; 
break;
case 64: this.$ = {type: 'math', expression: [$$[$0]], operator: 'not' }; 
break;
case 65: this.$ = $$[$0]; 
break;
case 66: this.$ = $$[$0]; 
break;
case 67: this.$ = {type: 'math', expression: [$$[$0-1]], operator: 'parenthesis' }; 
break;
case 68: this.$ = {type: "references", id: $$[$0-2], path: $$[$0-1], isWraped: true, leader: $$[$0-4] }; 
break;
case 69: this.$ = {type: "references", id: $$[$0-1], path: $$[$0], leader: $$[$0-2] }; 
break;
case 70: this.$ = {type: "references", id: $$[$0-2].id, path: $$[$0-1], isWraped: true, leader: $$[$0-4], args: $$[$0-2].args }; 
break;
case 71: this.$ = {type: "references", id: $$[$0-1].id, path: $$[$0], leader: $$[$0-2], args: $$[$0].args }; 
break;
case 72: this.$ = {type: "references", id: $$[$0], leader: $$[$0-1] }; 
break;
case 73: this.$ = {type: "references", id: $$[$0-1], isWraped: true, leader: $$[$0-3] }; 
break;
case 74: this.$ = {type: "references", id: $$[$0].id, leader: $$[$0-1], args: $$[$0].args }; 
break;
case 75: this.$ = {type: "references", id: $$[$0-1].id, isWraped: true, args: $$[$0-1].args, leader: $$[$0-3] }; 
break;
case 76: this.$ = $$[$0]; 
break;
case 77: this.$ = $$[$0]; 
break;
case 78: this.$ = $$[$0]; 
break;
case 79: this.$ = $$[$0]; 
break;
case 80: this.$ = [$$[$0]]; 
break;
case 81: this.$ = [].concat($$[$0-1], $$[$0]); 
break;
case 82: this.$ = {type:"method", id: $$[$0].id, args: $$[$0].args }; 
break;
case 83: this.$ = {type: "index", id: $$[$0] }; 
break;
case 84: this.$ = {type: "property", id: $$[$0] }; if ($$[$0].type === 'content') this.$ = $$[$0]; 
break;
case 85: this.$ = $$[$0]; 
break;
case 86: this.$ = {id: $$[$0-3], args: $$[$0-1] }; 
break;
case 87: this.$ = {id: $$[$0-2], args: false }; 
break;
case 88: this.$ = [$$[$0]]; 
break;
case 89: this.$ = [$$[$0]]; 
break;
case 90: this.$ = [].concat($$[$0-2], $$[$0]); 
break;
case 91: this.$ = [].concat($$[$0-2], $$[$0]); 
break;
case 92: this.$ = $$[$0]; 
break;
case 93: this.$ = {type: 'content', value: $$[$0-1] + $$[$0] }; 
break;
case 94: this.$ = $$[$0-1]; 
break;
case 95: this.$ = $$[$0-1]; 
break;
case 96: this.$ = {type: "content", value: $$[$0-2] + $$[$0-1].value + $$[$0] }; 
break;
case 97: this.$ = {type: "content", value: $$[$0-1] + $$[$0] }; 
break;
case 98: this.$ = {type: "content", value: $$[$0-1] + $$[$0] }; 
break;
case 99: this.$ = $$[$0]; 
break;
case 100: this.$ = {type: 'integer', value: $$[$0] }; 
break;
case 101: this.$ = {type: 'bool', value: $$[$0] }; 
break;
case 102: this.$ = $$[$0]; 
break;
case 103: this.$ = - parseInt($$[$0], 10); 
break;
case 104: this.$ = {type: 'string', value: $$[$0] }; 
break;
case 105: this.$ = {type: 'string', value: $$[$0], isEval: true }; 
break;
case 106: this.$ = $$[$0];
break;
case 107: this.$ = $$[$0];
break;
case 108: this.$ = $$[$0]; 
break;
case 109: this.$ = {type: 'array', value: $$[$0-1] }; 
break;
case 110: this.$ = {type: 'array', isRange: true, value: [$$[$0-3], $$[$0-1]] }; 
break;
case 111: this.$ = {type: 'array', value: [] }; 
break;
case 112: this.$ = {type: 'map', value: $$[$0-1] }; 
break;
case 113: this.$ = {}; this.$[$$[$0-2].value] = $$[$0]; 
break;
case 114: this.$ = {}; this.$[$$[$0-2].value] = $$[$0]; 
break;
case 115: this.$ = $$[$0-4]; this.$[$$[$0-2].value] = $$[$0]; 
break;
case 116: this.$ = $$[$0-4]; this.$[$$[$0-2].value] = $$[$0]; 
break;
case 117: this.$ = $$[$0]; 
break;
case 118: this.$ = $$[$0]; 
break;
case 119: this.$ = $$[$0-1] + $$[$0]; 
break;
case 120: this.$ = $$[$0-2] + $$[$0-1] + $$[$0]; 
break;
case 121: this.$ = $$[$0-2] + $$[$0-1]; 
break;
}
},
table: [{3:1,4:2,6:3,7:4,8:5,9:6,10:7,11:[1,8],12:10,13:11,14:12,15:13,16:14,17:15,18:16,19:17,20:18,21:19,22:20,23:[1,21],27:22,28:23,37:[1,9],38:[1,25],83:[1,24]},{1:[3]},{5:[1,26]},{5:[2,2],7:27,8:5,9:6,10:7,11:[1,8],12:10,13:11,14:12,15:13,16:14,17:15,18:16,19:17,20:18,21:19,22:20,23:[1,21],27:22,28:23,37:[1,9],38:[1,25],83:[1,24]},{5:[2,3],11:[2,3],23:[2,3],37:[2,3],38:[2,3],83:[2,3]},{5:[2,5],11:[2,5],23:[2,5],37:[2,5],38:[2,5],83:[2,5]},{5:[2,6],11:[2,6],23:[2,6],37:[2,6],38:[2,6],83:[2,6]},{5:[2,7],11:[2,7],23:[2,7],37:[2,7],38:[2,7],83:[2,7]},{5:[2,8],11:[2,8],23:[2,8],37:[2,8],38:[2,8],83:[2,8]},{38:[1,29],68:28,70:31,71:30,72:[1,32],73:[1,33],74:[1,34],75:[1,35]},{5:[2,9],11:[2,9],23:[2,9],37:[2,9],38:[2,9],83:[2,9]},{5:[2,10],11:[2,10],23:[2,10],37:[2,10],38:[2,10],83:[2,10]},{5:[2,11],11:[2,11],23:[2,11],37:[2,11],38:[2,11],83:[2,11]},{5:[2,12],11:[2,12],23:[2,12],37:[2,12],38:[2,12],83:[2,12]},{5:[2,13],11:[2,13],23:[2,13],37:[2,13],38:[2,13],83:[2,13]},{5:[2,14],11:[2,14],23:[2,14],37:[2,14],38:[2,14],83:[2,14]},{5:[2,15],11:[2,15],23:[2,15],37:[2,15],38:[2,15],83:[2,15]},{5:[2,16],11:[2,16],23:[2,16],37:[2,16],38:[2,16],83:[2,16]},{5:[2,17],11:[2,17],23:[2,17],37:[2,17],38:[2,17],83:[2,17]},{5:[2,18],11:[2,18],23:[2,18],37:[2,18],38:[2,18],83:[2,18]},{5:[2,19],11:[2,19],23:[2,19],37:[2,19],38:[2,19],83:[2,19]},{24:[1,36],29:[1,39],31:[1,40],33:[1,41],34:[1,42],35:[1,43],36:[1,44],38:[1,38],41:[1,45],42:[1,46],44:[1,47],46:[1,48],47:[1,49],48:[1,50],83:[1,37]},{5:[2,21],11:[2,21],23:[2,21],37:[2,21],38:[2,21],83:[2,21]},{5:[2,22],11:[2,22],23:[2,22],37:[2,22],38:[2,22],83:[2,22]},{5:[2,117],11:[2,117],23:[2,117],37:[2,117],38:[2,117],83:[2,117]},{5:[2,118],11:[2,118],23:[2,118],37:[2,118],38:[2,118],83:[2,118]},{1:[2,1]},{5:[2,4],11:[2,4],23:[2,4],37:[2,4],38:[2,4],83:[2,4]},{38:[1,51],71:52},{5:[2,72],11:[2,72],23:[2,72],25:[1,54],26:[2,72],37:[2,72],38:[2,72],53:[2,72],56:[2,72],57:[2,72],58:[2,72],59:[2,72],60:[2,72],61:[2,72],62:[2,72],63:[2,72],64:[2,72],65:[2,72],69:53,75:[2,72],76:55,77:56,78:57,79:58,80:[1,59],82:[2,72],83:[2,72],84:[1,60],85:[2,72],87:[2,72],88:[2,72],89:[2,72],90:[2,72]},{5:[2,74],11:[2,74],23:[2,74],26:[2,74],37:[2,74],38:[2,74],53:[2,74],56:[2,74],57:[2,74],58:[2,74],59:[2,74],60:[2,74],61:[2,74],62:[2,74],63:[2,74],64:[2,74],65:[2,74],69:61,75:[2,74],76:55,77:56,78:57,79:58,80:[1,59],82:[2,74],83:[2,74],84:[1,60],85:[2,74],87:[2,74],88:[2,74],89:[2,74],90:[2,74]},{38:[1,63],71:62},{38:[2,76]},{38:[2,77]},{5:[2,78],11:[2,78],23:[2,78],26:[2,78],37:[2,78],38:[2,78],53:[2,78],56:[2,78],57:[2,78],58:[2,78],59:[2,78],60:[2,78],61:[2,78],62:[2,78],63:[2,78],64:[2,78],65:[2,78],75:[2,78],82:[2,78],83:[2,78],85:[2,78],87:[2,78],88:[2,78],89:[2,78],90:[2,78]},{5:[2,79],11:[2,79],23:[2,79],26:[2,79],37:[2,79],38:[2,79],53:[2,79],56:[2,79],57:[2,79],58:[2,79],59:[2,79],60:[2,79],61:[2,79],62:[2,79],63:[2,79],64:[2,79],65:[2,79],75:[2,79],82:[2,79],83:[2,79],85:[2,79],87:[2,79],88:[2,79],89:[2,79],90:[2,79]},{25:[1,64]},{5:[2,119],11:[2,119],23:[2,119],37:[2,119],38:[2,119],83:[2,119]},{5:[1,66],25:[1,67],83:[1,65]},{25:[1,68]},{25:[1,69]},{25:[1,70]},{5:[2,26],11:[2,26],23:[2,26],37:[2,26],38:[2,26],83:[2,26]},{5:[2,27],11:[2,27],23:[2,27],37:[2,27],38:[2,27],83:[2,27]},{25:[1,71]},{5:[2,30],11:[2,30],23:[2,30],37:[2,30],38:[2,30],83:[2,30]},{25:[1,72]},{25:[1,73]},{25:[1,74]},{25:[1,75]},{25:[1,76]},{25:[1,54],69:77,70:78,74:[1,34],75:[1,35],76:55,77:56,78:57,79:58,80:[1,59],84:[1,60]},{69:79,76:55,77:56,78:57,79:58,80:[1,59],84:[1,60]},{5:[2,69],11:[2,69],23:[2,69],26:[2,69],37:[2,69],38:[2,69],53:[2,69],56:[2,69],57:[2,69],58:[2,69],59:[2,69],60:[2,69],61:[2,69],62:[2,69],63:[2,69],64:[2,69],65:[2,69],75:[2,69],76:80,77:56,78:57,79:58,80:[1,59],82:[2,69],83:[2,69],84:[1,60],85:[2,69],87:[2,69],88:[2,69],89:[2,69],90:[2,69]},{8:84,26:[1,82],37:[1,9],40:85,43:81,45:90,51:87,54:86,59:[1,96],73:[1,89],81:83,84:[1,88],86:91,87:[1,92],88:[1,95],89:[1,93],90:[1,94]},{5:[2,80],11:[2,80],23:[2,80],26:[2,80],37:[2,80],38:[2,80],53:[2,80],56:[2,80],57:[2,80],58:[2,80],59:[2,80],60:[2,80],61:[2,80],62:[2,80],63:[2,80],64:[2,80],65:[2,80],74:[2,80],75:[2,80],80:[2,80],82:[2,80],83:[2,80],84:[2,80],85:[2,80],87:[2,80],88:[2,80],89:[2,80],90:[2,80]},{5:[2,82],11:[2,82],23:[2,82],26:[2,82],37:[2,82],38:[2,82],53:[2,82],56:[2,82],57:[2,82],58:[2,82],59:[2,82],60:[2,82],61:[2,82],62:[2,82],63:[2,82],64:[2,82],65:[2,82],74:[2,82],75:[2,82],80:[2,82],82:[2,82],83:[2,82],84:[2,82],85:[2,82],87:[2,82],88:[2,82],89:[2,82],90:[2,82]},{5:[2,83],11:[2,83],23:[2,83],26:[2,83],37:[2,83],38:[2,83],53:[2,83],56:[2,83],57:[2,83],58:[2,83],59:[2,83],60:[2,83],61:[2,83],62:[2,83],63:[2,83],64:[2,83],65:[2,83],74:[2,83],75:[2,83],80:[2,83],82:[2,83],83:[2,83],84:[2,83],85:[2,83],87:[2,83],88:[2,83],89:[2,83],90:[2,83]},{5:[2,84],11:[2,84],23:[2,84],26:[2,84],37:[2,84],38:[2,84],53:[2,84],56:[2,84],57:[2,84],58:[2,84],59:[2,84],60:[2,84],61:[2,84],62:[2,84],63:[2,84],64:[2,84],65:[2,84],74:[2,84],75:[2,84],80:[2,84],82:[2,84],83:[2,84],84:[2,84],85:[2,84],87:[2,84],88:[2,84],89:[2,84],90:[2,84]},{38:[1,98],71:97,83:[1,99]},{8:101,37:[1,9],45:90,51:100,59:[1,96],83:[1,102],85:[1,103],86:91,87:[1,92],88:[1,95],89:[1,93],90:[1,94]},{5:[2,71],11:[2,71],23:[2,71],26:[2,71],37:[2,71],38:[2,71],53:[2,71],56:[2,71],57:[2,71],58:[2,71],59:[2,71],60:[2,71],61:[2,71],62:[2,71],63:[2,71],64:[2,71],65:[2,71],75:[2,71],76:80,77:56,78:57,79:58,80:[1,59],82:[2,71],83:[2,71],84:[1,60],85:[2,71],87:[2,71],88:[2,71],89:[2,71],90:[2,71]},{70:104,74:[1,34],75:[1,35]},{25:[1,54]},{26:[1,105]},{5:[2,120],11:[2,120],23:[2,120],37:[2,120],38:[2,120],83:[2,120]},{5:[2,121],11:[2,121],23:[2,121],37:[2,121],38:[2,121],83:[2,121]},{8:110,26:[1,107],37:[1,9],40:109,45:90,50:106,51:108,59:[1,96],84:[1,88],86:91,87:[1,92],88:[1,95],89:[1,93],90:[1,94]},{8:112,30:111,37:[1,9]},{8:120,25:[1,122],32:113,37:[1,9],40:114,45:90,51:121,54:115,55:116,59:[1,118],66:117,67:[1,119],73:[1,89],84:[1,88],86:91,87:[1,92],88:[1,95],89:[1,93],90:[1,94]},{8:120,25:[1,122],32:123,37:[1,9],40:114,45:90,51:121,54:115,55:116,59:[1,118],66:117,67:[1,119],73:[1,89],84:[1,88],86:91,87:[1,92],88:[1,95],89:[1,93],90:[1,94]},{37:[1,124]},{8:84,37:[1,9],40:85,43:125,45:90,51:87,54:86,59:[1,96],73:[1,89],81:83,84:[1,88],86:91,87:[1,92],88:[1,95],89:[1,93],90:[1,94]},{45:126,89:[1,93],90:[1,94]},{37:[1,127]},{37:[1,128]},{38:[1,129]},{70:130,74:[1,34],75:[1,35],76:80,77:56,78:57,79:58,80:[1,59],84:[1,60]},{5:[2,73],11:[2,73],23:[2,73],26:[2,73],37:[2,73],38:[2,73],53:[2,73],56:[2,73],57:[2,73],58:[2,73],59:[2,73],60:[2,73],61:[2,73],62:[2,73],63:[2,73],64:[2,73],65:[2,73],75:[2,73],82:[2,73],83:[2,73],85:[2,73],87:[2,73],88:[2,73],89:[2,73],90:[2,73]},{70:131,74:[1,34],75:[1,35],76:80,77:56,78:57,79:58,80:[1,59],84:[1,60]},{5:[2,81],11:[2,81],23:[2,81],26:[2,81],37:[2,81],38:[2,81],53:[2,81],56:[2,81],57:[2,81],58:[2,81],59:[2,81],60:[2,81],61:[2,81],62:[2,81],63:[2,81],64:[2,81],65:[2,81],74:[2,81],75:[2,81],80:[2,81],82:[2,81],83:[2,81],84:[2,81],85:[2,81],87:[2,81],88:[2,81],89:[2,81],90:[2,81]},{26:[1,132],82:[1,133]},{5:[2,87],11:[2,87],23:[2,87],26:[2,87],37:[2,87],38:[2,87],53:[2,87],56:[2,87],57:[2,87],58:[2,87],59:[2,87],60:[2,87],61:[2,87],62:[2,87],63:[2,87],64:[2,87],65:[2,87],74:[2,87],75:[2,87],80:[2,87],82:[2,87],83:[2,87],84:[2,87],85:[2,87],87:[2,87],88:[2,87],89:[2,87],90:[2,87]},{26:[2,88],82:[2,88],85:[2,88]},{26:[2,89],82:[2,89],85:[2,89]},{26:[2,106],82:[2,106],85:[2,106]},{26:[2,107],82:[2,107],85:[2,107]},{26:[2,108],82:[2,108],85:[2,108]},{8:84,37:[1,9],40:85,43:134,45:90,51:87,54:86,59:[1,96],73:[1,89],81:83,84:[1,88],85:[1,136],86:135,87:[1,92],88:[1,95],89:[1,93],90:[1,94]},{45:138,89:[1,93],90:[1,94],92:137},{26:[2,99],37:[2,99],56:[2,99],57:[2,99],58:[2,99],59:[2,99],60:[2,99],61:[2,99],62:[2,99],63:[2,99],64:[2,99],65:[2,99],75:[2,99],82:[2,99],83:[2,99],85:[2,99],87:[2,99],88:[2,99],89:[2,99],90:[2,99]},{26:[2,100],37:[2,100],56:[2,100],57:[2,100],58:[2,100],59:[2,100],60:[2,100],61:[2,100],62:[2,100],63:[2,100],64:[2,100],65:[2,100],75:[2,100],82:[2,100],83:[2,100],85:[2,100],87:[2,100],88:[2,100],89:[2,100],90:[2,100]},{26:[2,101],37:[2,101],56:[2,101],57:[2,101],58:[2,101],59:[2,101],60:[2,101],61:[2,101],62:[2,101],63:[2,101],64:[2,101],65:[2,101],75:[2,101],82:[2,101],83:[2,101],85:[2,101],87:[2,101],88:[2,101],89:[2,101],90:[2,101]},{26:[2,104],37:[2,104],56:[2,104],57:[2,104],58:[2,104],59:[2,104],60:[2,104],61:[2,104],62:[2,104],63:[2,104],64:[2,104],65:[2,104],75:[2,104],82:[2,104],83:[2,104],85:[2,104],87:[2,104],88:[2,104],89:[2,104],90:[2,104],93:[2,104]},{26:[2,105],37:[2,105],56:[2,105],57:[2,105],58:[2,105],59:[2,105],60:[2,105],61:[2,105],62:[2,105],63:[2,105],64:[2,105],65:[2,105],75:[2,105],82:[2,105],83:[2,105],85:[2,105],87:[2,105],88:[2,105],89:[2,105],90:[2,105],93:[2,105]},{26:[2,102],37:[2,102],56:[2,102],57:[2,102],58:[2,102],59:[2,102],60:[2,102],61:[2,102],62:[2,102],63:[2,102],64:[2,102],65:[2,102],75:[2,102],82:[2,102],83:[2,102],85:[2,102],87:[2,102],88:[2,102],89:[2,102],90:[2,102],91:[2,102]},{88:[1,139]},{5:[2,85],11:[2,85],23:[2,85],26:[2,85],37:[2,85],38:[2,85],53:[2,85],56:[2,85],57:[2,85],58:[2,85],59:[2,85],60:[2,85],61:[2,85],62:[2,85],63:[2,85],64:[2,85],65:[2,85],74:[2,85],75:[2,85],80:[2,85],82:[2,85],83:[2,85],84:[2,85],85:[2,85],87:[2,85],88:[2,85],89:[2,85],90:[2,85]},{5:[2,92],11:[2,92],23:[2,92],25:[1,54],26:[2,92],37:[2,92],38:[2,92],53:[2,92],56:[2,92],57:[2,92],58:[2,92],59:[2,92],60:[2,92],61:[2,92],62:[2,92],63:[2,92],64:[2,92],65:[2,92],74:[2,92],75:[2,92],80:[2,92],82:[2,92],83:[2,92],84:[2,92],85:[2,92],87:[2,92],88:[2,92],89:[2,92],90:[2,92]},{5:[2,93],11:[2,93],23:[2,93],26:[2,93],37:[2,93],38:[2,93],53:[2,93],56:[2,93],57:[2,93],58:[2,93],59:[2,93],60:[2,93],61:[2,93],62:[2,93],63:[2,93],64:[2,93],65:[2,93],74:[2,93],75:[2,93],80:[2,93],82:[2,93],83:[2,93],84:[2,93],85:[2,93],87:[2,93],88:[2,93],89:[2,93],90:[2,93]},{83:[1,141],85:[1,140]},{85:[1,142]},{5:[2,97],11:[2,97],23:[2,97],26:[2,97],37:[2,97],38:[2,97],53:[2,97],56:[2,97],57:[2,97],58:[2,97],59:[2,97],60:[2,97],61:[2,97],62:[2,97],63:[2,97],64:[2,97],65:[2,97],74:[2,97],75:[2,97],80:[2,97],82:[2,97],83:[2,97],84:[2,97],85:[2,97],87:[2,97],88:[2,97],89:[2,97],90:[2,97]},{5:[2,98],11:[2,98],23:[2,98],26:[2,98],37:[2,98],38:[2,98],53:[2,98],56:[2,98],57:[2,98],58:[2,98],59:[2,98],60:[2,98],61:[2,98],62:[2,98],63:[2,98],64:[2,98],65:[2,98],74:[2,98],75:[2,98],80:[2,98],82:[2,98],83:[2,98],84:[2,98],85:[2,98],87:[2,98],88:[2,98],89:[2,98],90:[2,98]},{5:[2,75],11:[2,75],23:[2,75],26:[2,75],37:[2,75],38:[2,75],53:[2,75],56:[2,75],57:[2,75],58:[2,75],59:[2,75],60:[2,75],61:[2,75],62:[2,75],63:[2,75],64:[2,75],65:[2,75],75:[2,75],82:[2,75],83:[2,75],85:[2,75],87:[2,75],88:[2,75],89:[2,75],90:[2,75]},{5:[2,20],11:[2,20],23:[2,20],37:[2,20],38:[2,20],83:[2,20]},{8:145,26:[1,143],37:[1,9],45:90,51:144,59:[1,96],86:91,87:[1,92],88:[1,95],89:[1,93],90:[1,94]},{5:[2,40],11:[2,40],23:[2,40],37:[2,40],38:[2,40],83:[2,40]},{26:[2,41],37:[2,41],59:[2,41],87:[2,41],88:[2,41],89:[2,41],90:[2,41]},{26:[2,42],37:[2,42],59:[2,42],87:[2,42],88:[2,42],89:[2,42],90:[2,42]},{26:[2,43],37:[2,43],59:[2,43],87:[2,43],88:[2,43],89:[2,43],90:[2,43]},{26:[1,146]},{53:[1,147]},{26:[1,148]},{26:[2,49]},{26:[2,50]},{26:[2,51],56:[1,149],57:[1,150],58:[1,151],59:[1,152],60:[1,153],61:[1,154],62:[1,155],63:[1,156],64:[1,157],65:[1,158]},{26:[2,62],56:[2,62],57:[2,62],58:[2,62],59:[2,62],60:[2,62],61:[2,62],62:[2,62],63:[2,62],64:[2,62],65:[2,62]},{25:[1,122],66:159,88:[1,139]},{8:120,25:[1,122],37:[1,9],45:90,51:121,55:160,59:[1,118],66:117,67:[1,119],86:91,87:[1,92],88:[1,95],89:[1,93],90:[1,94]},{26:[2,65],56:[2,65],57:[2,65],58:[2,65],59:[2,65],60:[2,65],61:[2,65],62:[2,65],63:[2,65],64:[2,65],65:[2,65]},{26:[2,66],56:[2,66],57:[2,66],58:[2,66],59:[2,66],60:[2,66],61:[2,66],62:[2,66],63:[2,66],64:[2,66],65:[2,66]},{8:120,25:[1,122],37:[1,9],45:90,51:121,55:161,59:[1,118],66:117,67:[1,119],86:91,87:[1,92],88:[1,95],89:[1,93],90:[1,94]},{26:[1,162]},{38:[1,163]},{26:[1,164],82:[1,133]},{26:[1,165]},{38:[1,166]},{38:[1,167]},{8:170,26:[1,169],37:[1,9],49:168},{5:[2,68],11:[2,68],23:[2,68],26:[2,68],37:[2,68],38:[2,68],53:[2,68],56:[2,68],57:[2,68],58:[2,68],59:[2,68],60:[2,68],61:[2,68],62:[2,68],63:[2,68],64:[2,68],65:[2,68],75:[2,68],82:[2,68],83:[2,68],85:[2,68],87:[2,68],88:[2,68],89:[2,68],90:[2,68]},{5:[2,70],11:[2,70],23:[2,70],26:[2,70],37:[2,70],38:[2,70],53:[2,70],56:[2,70],57:[2,70],58:[2,70],59:[2,70],60:[2,70],61:[2,70],62:[2,70],63:[2,70],64:[2,70],65:[2,70],75:[2,70],82:[2,70],83:[2,70],85:[2,70],87:[2,70],88:[2,70],89:[2,70],90:[2,70]},{5:[2,86],11:[2,86],23:[2,86],26:[2,86],37:[2,86],38:[2,86],53:[2,86],56:[2,86],57:[2,86],58:[2,86],59:[2,86],60:[2,86],61:[2,86],62:[2,86],63:[2,86],64:[2,86],65:[2,86],74:[2,86],75:[2,86],80:[2,86],82:[2,86],83:[2,86],84:[2,86],85:[2,86],87:[2,86],88:[2,86],89:[2,86],90:[2,86]},{8:172,37:[1,9],40:85,45:90,51:87,54:86,59:[1,96],73:[1,89],81:171,84:[1,88],86:91,87:[1,92],88:[1,95],89:[1,93],90:[1,94]},{82:[1,133],85:[1,173]},{82:[2,100],85:[2,100],91:[1,174]},{26:[2,111],37:[2,111],59:[2,111],82:[2,111],85:[2,111],87:[2,111],88:[2,111],89:[2,111],90:[2,111]},{75:[1,175],82:[1,176]},{93:[1,177]},{26:[2,103],37:[2,103],56:[2,103],57:[2,103],58:[2,103],59:[2,103],60:[2,103],61:[2,103],62:[2,103],63:[2,103],64:[2,103],65:[2,103],75:[2,103],82:[2,103],83:[2,103],85:[2,103],87:[2,103],88:[2,103],89:[2,103],90:[2,103],91:[2,103]},{5:[2,94],11:[2,94],23:[2,94],26:[2,94],37:[2,94],38:[2,94],53:[2,94],56:[2,94],57:[2,94],58:[2,94],59:[2,94],60:[2,94],61:[2,94],62:[2,94],63:[2,94],64:[2,94],65:[2,94],74:[2,94],75:[2,94],80:[2,94],82:[2,94],83:[2,94],84:[2,94],85:[2,94],87:[2,94],88:[2,94],89:[2,94],90:[2,94]},{5:[2,96],11:[2,96],23:[2,96],26:[2,96],37:[2,96],38:[2,96],53:[2,96],56:[2,96],57:[2,96],58:[2,96],59:[2,96],60:[2,96],61:[2,96],62:[2,96],63:[2,96],64:[2,96],65:[2,96],74:[2,96],75:[2,96],80:[2,96],82:[2,96],83:[2,96],84:[2,96],85:[2,96],87:[2,96],88:[2,96],89:[2,96],90:[2,96]},{5:[2,95],11:[2,95],23:[2,95],26:[2,95],37:[2,95],38:[2,95],53:[2,95],56:[2,95],57:[2,95],58:[2,95],59:[2,95],60:[2,95],61:[2,95],62:[2,95],63:[2,95],64:[2,95],65:[2,95],74:[2,95],75:[2,95],80:[2,95],82:[2,95],83:[2,95],84:[2,95],85:[2,95],87:[2,95],88:[2,95],89:[2,95],90:[2,95]},{5:[2,39],11:[2,39],23:[2,39],37:[2,39],38:[2,39],83:[2,39]},{26:[2,44],37:[2,44],59:[2,44],87:[2,44],88:[2,44],89:[2,44],90:[2,44]},{26:[2,45],37:[2,45],59:[2,45],87:[2,45],88:[2,45],89:[2,45],90:[2,45]},{5:[2,23],11:[2,23],23:[2,23],37:[2,23],38:[2,23],83:[2,23]},{8:120,25:[1,122],32:178,37:[1,9],40:114,45:90,51:121,54:115,55:116,59:[1,118],66:117,67:[1,119],73:[1,89],84:[1,88],86:91,87:[1,92],88:[1,95],89:[1,93],90:[1,94]},{5:[2,24],11:[2,24],23:[2,24],37:[2,24],38:[2,24],83:[2,24]},{8:120,25:[1,122],37:[1,9],45:90,51:121,55:179,59:[1,118],66:117,67:[1,119],86:91,87:[1,92],88:[1,95],89:[1,93],90:[1,94]},{8:120,25:[1,122],37:[1,9],45:90,51:121,55:180,59:[1,118],66:117,67:[1,119],86:91,87:[1,92],88:[1,95],89:[1,93],90:[1,94]},{8:120,25:[1,122],37:[1,9],45:90,51:121,55:181,59:[1,118],66:117,67:[1,119],86:91,87:[1,92],88:[1,95],89:[1,93],90:[1,94]},{8:120,25:[1,122],37:[1,9],45:90,51:121,55:182,59:[1,118],66:117,67:[1,119],86:91,87:[1,92],88:[1,95],89:[1,93],90:[1,94]},{8:120,25:[1,122],37:[1,9],45:90,51:121,55:183,59:[1,118],66:117,67:[1,119],86:91,87:[1,92],88:[1,95],89:[1,93],90:[1,94]},{8:120,25:[1,122],37:[1,9],45:90,51:121,55:184,59:[1,118],66:117,67:[1,119],86:91,87:[1,92],88:[1,95],89:[1,93],90:[1,94]},{8:120,25:[1,122],37:[1,9],45:90,51:121,55:185,59:[1,118],66:117,67:[1,119],86:91,87:[1,92],88:[1,95],89:[1,93],90:[1,94]},{8:120,25:[1,122],37:[1,9],45:90,51:121,55:186,59:[1,118],66:117,67:[1,119],86:91,87:[1,92],88:[1,95],89:[1,93],90:[1,94]},{8:120,25:[1,122],37:[1,9],45:90,51:121,55:187,59:[1,118],66:117,67:[1,119],86:91,87:[1,92],88:[1,95],89:[1,93],90:[1,94]},{8:120,25:[1,122],37:[1,9],45:90,51:121,55:188,59:[1,118],66:117,67:[1,119],86:91,87:[1,92],88:[1,95],89:[1,93],90:[1,94]},{26:[2,63],56:[2,63],57:[2,63],58:[2,63],59:[2,63],60:[2,63],61:[2,63],62:[2,63],63:[2,63],64:[2,63],65:[2,63]},{26:[2,64],56:[2,64],57:[2,64],58:[2,64],59:[2,64],60:[2,64],61:[2,64],62:[2,64],63:[2,64],64:[2,64],65:[2,64]},{26:[1,189],56:[1,149],57:[1,150],58:[1,151],59:[1,152],60:[1,153],61:[1,154],62:[1,155],63:[1,156],64:[1,157],65:[1,158]},{5:[2,25],11:[2,25],23:[2,25],37:[2,25],38:[2,25],83:[2,25]},{39:[1,190]},{5:[2,31],11:[2,31],23:[2,31],37:[2,31],38:[2,31],83:[2,31]},{5:[2,32],11:[2,32],23:[2,32],37:[2,32],38:[2,32],83:[2,32]},{26:[1,191]},{26:[1,192]},{8:194,26:[1,193],37:[1,9]},{5:[2,36],11:[2,36],23:[2,36],37:[2,36],38:[2,36],83:[2,36]},{26:[2,37],37:[2,37]},{26:[2,90],82:[2,90],85:[2,90]},{26:[2,91],82:[2,91],85:[2,91]},{26:[2,109],37:[2,109],59:[2,109],82:[2,109],85:[2,109],87:[2,109],88:[2,109],89:[2,109],90:[2,109]},{59:[1,96],86:195,88:[1,95]},{26:[2,112],82:[2,112],85:[2,112]},{45:196,89:[1,93],90:[1,94]},{8:198,37:[1,9],45:90,51:197,59:[1,96],86:91,87:[1,92],88:[1,95],89:[1,93],90:[1,94]},{26:[2,48]},{26:[2,52],56:[2,52],57:[2,52],58:[1,151],59:[1,152],60:[1,153],61:[1,154],62:[1,155],63:[1,156],64:[1,157],65:[1,158]},{26:[2,53],56:[2,53],57:[2,53],58:[1,151],59:[1,152],60:[1,153],61:[1,154],62:[1,155],63:[1,156],64:[1,157],65:[1,158]},{26:[2,54],56:[2,54],57:[2,54],58:[2,54],59:[2,54],60:[1,153],61:[1,154],62:[2,54],63:[2,54],64:[2,54],65:[2,54]},{26:[2,55],56:[2,55],57:[2,55],58:[2,55],59:[2,55],60:[1,153],61:[1,154],62:[2,55],63:[2,55],64:[2,55],65:[2,55]},{26:[2,56],56:[2,56],57:[2,56],58:[2,56],59:[2,56],60:[2,56],61:[2,56],62:[2,56],63:[2,56],64:[2,56],65:[2,56]},{26:[2,57],56:[2,57],57:[2,57],58:[2,57],59:[2,57],60:[2,57],61:[2,57],62:[2,57],63:[2,57],64:[2,57],65:[2,57]},{26:[2,58],56:[2,58],57:[2,58],58:[1,151],59:[1,152],60:[1,153],61:[1,154],62:[2,58],63:[2,58],64:[2,58],65:[2,58]},{26:[2,59],56:[2,59],57:[2,59],58:[1,151],59:[1,152],60:[1,153],61:[1,154],62:[2,59],63:[2,59],64:[2,59],65:[2,59]},{26:[2,60],56:[2,60],57:[2,60],58:[1,151],59:[1,152],60:[1,153],61:[1,154],62:[2,60],63:[2,60],64:[2,60],65:[2,60]},{26:[2,61],56:[2,61],57:[2,61],58:[1,151],59:[1,152],60:[1,153],61:[1,154],62:[2,61],63:[2,61],64:[2,61],65:[2,61]},{26:[2,67],56:[2,67],57:[2,67],58:[2,67],59:[2,67],60:[2,67],61:[2,67],62:[2,67],63:[2,67],64:[2,67],65:[2,67]},{8:199,37:[1,9],40:200,84:[1,88]},{5:[2,33],11:[2,33],23:[2,33],37:[2,33],38:[2,33],83:[2,33]},{5:[2,34],11:[2,34],23:[2,34],37:[2,34],38:[2,34],83:[2,34]},{5:[2,35],11:[2,35],23:[2,35],37:[2,35],38:[2,35],83:[2,35]},{26:[2,38],37:[2,38]},{85:[1,201]},{93:[1,202]},{75:[2,113],82:[2,113]},{75:[2,114],82:[2,114]},{26:[1,203]},{26:[1,204]},{26:[2,110],37:[2,110],59:[2,110],82:[2,110],85:[2,110],87:[2,110],88:[2,110],89:[2,110],90:[2,110]},{8:205,37:[1,9],45:90,51:206,59:[1,96],86:91,87:[1,92],88:[1,95],89:[1,93],90:[1,94]},{5:[2,28],11:[2,28],23:[2,28],37:[2,28],38:[2,28],83:[2,28]},{5:[2,29],11:[2,29],23:[2,29],37:[2,29],38:[2,29],83:[2,29]},{75:[2,115],82:[2,115]},{75:[2,116],82:[2,116]}],
defaultActions: {26:[2,1],32:[2,76],33:[2,77],114:[2,49],115:[2,50],178:[2,48]},
parseError: function parseError(str, hash) {
    throw new Error(str);
},
parse: function parse(input) {
    var self = this, stack = [0], vstack = [null], lstack = [], table = this.table, yytext = "", yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
    this.lexer.setInput(input);
    this.lexer.yy = this.yy;
    this.yy.lexer = this.lexer;
    this.yy.parser = this;
    if (typeof this.lexer.yylloc == "undefined")
        this.lexer.yylloc = {};
    var yyloc = this.lexer.yylloc;
    lstack.push(yyloc);
    var ranges = this.lexer.options && this.lexer.options.ranges;
    if (typeof this.yy.parseError === "function")
        this.parseError = this.yy.parseError;
    function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }
    function lex() {
        var token;
        token = self.lexer.lex() || 1;
        if (typeof token !== "number") {
            token = self.symbols_[token] || token;
        }
        return token;
    }
    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        state = stack[stack.length - 1];
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == "undefined") {
                symbol = lex();
            }
            action = table[state] && table[state][symbol];
        }
        if (typeof action === "undefined" || !action.length || !action[0]) {
            var errStr = "";
            if (!recovering) {
                expected = [];
                for (p in table[state])
                    if (this.terminals_[p] && p > 2) {
                        expected.push("'" + this.terminals_[p] + "'");
                    }
                if (this.lexer.showPosition) {
                    errStr = "Parse error on line " + (yylineno + 1) + ":\n" + this.lexer.showPosition() + "\nExpecting " + expected.join(", ") + ", got '" + (this.terminals_[symbol] || symbol) + "'";
                } else {
                    errStr = "Parse error on line " + (yylineno + 1) + ": Unexpected " + (symbol == 1?"end of input":"'" + (this.terminals_[symbol] || symbol) + "'");
                }
                this.parseError(errStr, {text: this.lexer.match, token: this.terminals_[symbol] || symbol, line: this.lexer.yylineno, loc: yyloc, expected: expected});
            }
        }
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error("Parse Error: multiple actions possible at state: " + state + ", token: " + symbol);
        }
        switch (action[0]) {
        case 1:
            stack.push(symbol);
            vstack.push(this.lexer.yytext);
            lstack.push(this.lexer.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
                yyleng = this.lexer.yyleng;
                yytext = this.lexer.yytext;
                yylineno = this.lexer.yylineno;
                yyloc = this.lexer.yylloc;
                if (recovering > 0)
                    recovering--;
            } else {
                symbol = preErrorSymbol;
                preErrorSymbol = null;
            }
            break;
        case 2:
            len = this.productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {first_line: lstack[lstack.length - (len || 1)].first_line, last_line: lstack[lstack.length - 1].last_line, first_column: lstack[lstack.length - (len || 1)].first_column, last_column: lstack[lstack.length - 1].last_column};
            if (ranges) {
                yyval._$.range = [lstack[lstack.length - (len || 1)].range[0], lstack[lstack.length - 1].range[1]];
            }
            r = this.performAction.call(yyval, yytext, yyleng, yylineno, this.yy, action[1], vstack, lstack);
            if (typeof r !== "undefined") {
                return r;
            }
            if (len) {
                stack = stack.slice(0, -1 * len * 2);
                vstack = vstack.slice(0, -1 * len);
                lstack = lstack.slice(0, -1 * len);
            }
            stack.push(this.productions_[action[1]][0]);
            vstack.push(yyval.$);
            lstack.push(yyval._$);
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
        case 3:
            return true;
        }
    }
    return true;
}
};
/* Jison generated lexer */
var lexer = (function(){
var lexer = ({EOF:1,
parseError:function parseError(str, hash) {
        if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },
setInput:function (input) {
        this._input = input;
        this._more = this._less = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {first_line:1,first_column:0,last_line:1,last_column:0};
        if (this.options.ranges) this.yylloc.range = [0,0];
        this.offset = 0;
        return this;
    },
input:function () {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno++;
            this.yylloc.last_line++;
        } else {
            this.yylloc.last_column++;
        }
        if (this.options.ranges) this.yylloc.range[1]++;

        this._input = this._input.slice(1);
        return ch;
    },
unput:function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length-len-1);
        //this.yyleng -= len;
        this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length-1);
        this.matched = this.matched.substr(0, this.matched.length-1);

        if (lines.length-1) this.yylineno -= lines.length-1;
        var r = this.yylloc.range;

        this.yylloc = {first_line: this.yylloc.first_line,
          last_line: this.yylineno+1,
          first_column: this.yylloc.first_column,
          last_column: lines ?
              (lines.length === oldLines.length ? this.yylloc.first_column : 0) + oldLines[oldLines.length - lines.length].length - lines[0].length:
              this.yylloc.first_column - len
          };

        if (this.options.ranges) {
            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        return this;
    },
more:function () {
        this._more = true;
        return this;
    },
less:function (n) {
        this.unput(this.match.slice(n));
    },
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20)+(next.length > 20 ? '...':'')).replace(/\n/g, "");
    },
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c+"^";
    },
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) this.done = true;

        var token,
            match,
            tempMatch,
            index,
            col,
            lines;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i=0;i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (!this.options.flex) break;
            }
        }
        if (match) {
            lines = match[0].match(/(?:\r\n?|\n).*/g);
            if (lines) this.yylineno += lines.length;
            this.yylloc = {first_line: this.yylloc.last_line,
                           last_line: this.yylineno+1,
                           first_column: this.yylloc.last_column,
                           last_column: lines ? lines[lines.length-1].length-lines[lines.length-1].match(/\r?\n?/)[0].length : this.yylloc.last_column + match[0].length};
            this.yytext += match[0];
            this.match += match[0];
            this.matches = match;
            this.yyleng = this.yytext.length;
            if (this.options.ranges) {
                this.yylloc.range = [this.offset, this.offset += this.yyleng];
            }
            this._more = false;
            this._input = this._input.slice(match[0].length);
            this.matched += match[0];
            token = this.performAction.call(this, this.yy, this, rules[index],this.conditionStack[this.conditionStack.length-1]);
            if (this.done && this._input) this.done = false;
            if (token) return token;
            else return;
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            return this.parseError('Lexical error on line '+(this.yylineno+1)+'. Unrecognized text.\n'+this.showPosition(),
                    {text: "", token: null, line: this.yylineno});
        }
    },
lex:function lex() {
        var r = this.next();
        if (typeof r !== 'undefined') {
            return r;
        } else {
            return this.lex();
        }
    },
begin:function begin(condition) {
        this.conditionStack.push(condition);
    },
popState:function popState() {
        return this.conditionStack.pop();
    },
_currentRules:function _currentRules() {
        return this.conditions[this.conditionStack[this.conditionStack.length-1]].rules;
    },
topState:function () {
        return this.conditionStack[this.conditionStack.length-2];
    },
pushState:function begin(condition) {
        this.begin(condition);
    }});
lexer.options = {};
lexer.performAction = function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {

var YYSTATE=YY_START
switch($avoiding_name_collisions) {
case 0:
                                    var _reg = /\\+$/;
                                    var _esc = yy_.yytext.match(_reg);
                                    var _num = _esc ? _esc[0].length: null;
                                    /*转义实现，非常恶心，暂时没有好的解决方案*/
                                    if (!_num || !(_num % 2)) {
                                      this.begin("mu");
                                    } else {
                                      yy_.yytext = yy_.yytext.replace(/\\$/, '');
                                      this.begin('esc');
                                    }
                                    if (_num > 1) yy_.yytext = yy_.yytext.replace(/(\\\\)+$/, '\\');
                                    if(yy_.yytext) return 83; 
                                  
break;
case 1: 
                                    var _reg = /\\+$/;
                                    var _esc = yy_.yytext.match(_reg);
                                    var _num = _esc ? _esc[0].length: null;
                                    if (!_num || !(_num % 2)) {
                                      this.begin("h");
                                    } else {
                                      yy_.yytext = yy_.yytext.replace(/\\$/, '');
                                      this.begin('esc');
                                    }
                                    if (_num > 1) yy_.yytext = yy_.yytext.replace(/(\\\\)+$/, '\\');
                                    if(yy_.yytext) return 83; 
                                  
break;
case 2: return 83; 
break;
case 3: this.popState(); return 11; 
break;
case 4: this.popState(); yy_.yytext = yy_.yytext.replace(/^#\[\[|\]\]#$/g, ''); return 83
break;
case 5: this.popState(); return 11; 
break;
case 6: return 23; 
break;
case 7: return 29; 
break;
case 8: return 31; 
break;
case 9: return 33; 
break;
case 10: this.popState(); return 34; 
break;
case 11: this.popState(); return 34; 
break;
case 12: this.popState(); return 35; 
break;
case 13: this.popState(); return 41; 
break;
case 14: return 36; 
break;
case 15: return 42; 
break;
case 16: return 44; 
break;
case 17: return 24; 
break;
case 18: return 'EVAL'; 
break;
case 19: return 47; 
break;
case 20: return 48; 
break;
case 21: return 39; 
break;
case 22: return yy_.yytext; 
break;
case 23: return yy_.yytext; 
break;
case 24: return yy_.yytext; 
break;
case 25: return yy_.yytext; 
break;
case 26: return yy_.yytext; 
break;
case 27: return yy_.yytext; 
break;
case 28: return 37; 
break;
case 29: return 37; 
break;
case 30: return yy_.yytext; 
break;
case 31: return 53; 
break;
case 32: /*ignore whitespace*/ 
break;
case 33: return 73; 
break;
case 34: return 75; 
break;
case 35: return 93; 
break;
case 36: return 72; 
break;
case 37: this.popState(); return 74; 
break;
case 38: this.begin("c"); return 25; 
break;
case 39: 
                                    if (this.popState() === "c") {
                                      var len = this.conditionStack.length;
                                      /** 遇到#set(a = b)括号结束后结束状态h*/
                                      if (len === 2 && this.conditionStack[1] === "h"){
                                        this.popState();
                                      }
                                      return 26; 
                                    } else {
                                      return 'CONTENT'; 
                                    }
                                  
break;
case 40: this.begin("i"); return 84; 
break;
case 41: 
                                    if (this.popState() === "i") {
                                      return 85; 
                                    } else {
                                      return 'CONTENT';
                                    }
                                  
break;
case 42: return 91; 
break;
case 43: return 80; 
break;
case 44: return 82; 
break;
case 45: yy_.yytext = yy_.yytext.substr(1, yy_.yyleng-2).replace(/\\"/g,'"'); return 90; 
break;
case 46: yy_.yytext = yy_.yytext.substr(1, yy_.yyleng-2).replace(/\\'/g,"'"); return 89; 
break;
case 47: return 87; 
break;
case 48: return 87; 
break;
case 49: return 87; 
break;
case 50: return 88; 
break;
case 51: return 38; 
break;
case 52: this.begin('h'); return 23; 
break;
case 53: this.popState(); return 83; 
break;
case 54: this.popState(); return 83; 
break;
case 55: this.popState(); return 83; 
break;
case 56: this.popState(); return 5; 
break;
case 57: return 5; 
break;
}
};
lexer.rules = [/^(?:[^#]*?(?=\$))/,/^(?:[^\$]*?(?=#))/,/^(?:[^\x00]+)/,/^(?:#\*[\s\S]+?\*#)/,/^(?:#\[\[[\s\S]+?\]\]#)/,/^(?:##[^\n]+)/,/^(?:#(?=[^\s]))/,/^(?:set[ ]*)/,/^(?:if[ ]*)/,/^(?:elseif[ ]*)/,/^(?:else\b)/,/^(?:\{else\})/,/^(?:end\b)/,/^(?:break\b)/,/^(?:foreach[ ]*)/,/^(?:include[ ]*)/,/^(?:parse[ ]*)/,/^(?:noescape\b)/,/^(?:evaluate\b)/,/^(?:define[ ]*)/,/^(?:macro[ ]*)/,/^(?:in\b)/,/^(?:[\+\-\*/])/,/^(?:[><])/,/^(?:==)/,/^(?:\|\|)/,/^(?:&&)/,/^(?:!=)/,/^(?:\$!)/,/^(?:\$)/,/^(?:!)/,/^(?:=)/,/^(?:\s+)/,/^(?:\{)/,/^(?:\})/,/^(?::)/,/^(?:\{)/,/^(?:\})/,/^(?:\()/,/^(?:\))/,/^(?:\[)/,/^(?:\])/,/^(?:\.\.)/,/^(?:\.)/,/^(?:,)/,/^(?:"(\\"|[^\"])*")/,/^(?:'(\\'|[^\'])*')/,/^(?:null\b)/,/^(?:false\b)/,/^(?:true\b)/,/^(?:[0-9]+)/,/^(?:[a-zA-Z][a-zA-Z0-9_\-]*)/,/^(?:#)/,/^(?:.)/,/^(?:\s+)/,/^(?:[\$#])/,/^(?:$)/,/^(?:$)/];
lexer.conditions = {"mu":{"rules":[5,28,29,36,37,38,39,40,41,43,51,52,53,54,56],"inclusive":false},"c":{"rules":[21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,38,39,40,41,43,44,45,46,47,48,49,50,51],"inclusive":false},"i":{"rules":[21,22,23,24,25,26,27,28,29,30,31,32,33,34,38,39,40,41,42,43,44,45,46,47,48,49,50,51],"inclusive":false},"h":{"rules":[3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,29,30,31,35,38,39,40,41,43,50,51,53,54,56],"inclusive":false},"esc":{"rules":[55],"inclusive":false},"INITIAL":{"rules":[0,1,2,57],"inclusive":true}};
return lexer;})()
parser.lexer = lexer;
function Parser () { this.yy = {}; }Parser.prototype = parser;parser.Parser = Parser;
return new Parser;
})();
if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
exports.parser = velocity;
exports.Parser = velocity.Parser;
exports.parse = function () { return velocity.parse.apply(velocity, arguments); }
exports.main = function commonjsMain(args) {
    if (!args[1])
        throw new Error('Usage: '+args[0]+' FILE');
    var source, cwd;
    if (typeof process !== 'undefined') {
        source = require('fs').readFileSync(require('path').resolve(args[1]), "utf8");
    } else {
        source = require("file").path(require("file").cwd()).join(args[1]).read({charset: "utf-8"});
    }
    return exports.parser.parse(source);
}
if (typeof module !== 'undefined' && require.main === module) {
  exports.main(typeof process !== 'undefined' ? process.argv.slice(1) : require("system").args);
}
}    return velocity;  });  
