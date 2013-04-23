/*
 Copyright 2011, KISSY UI Library v1.20
 MIT Licensed
 build time: Nov 28 12:39
 */
KISSY.add("imagezoom/zoomer", function(j, m, g) {
	function k() {
		var a;
		if(( a = this.get("bigImageSrc")) && this.get("preload"))
			(new Image).src = a;
		this._isInner = this.get("type") === r;
		e = new m(document.body)
	}

	function o(a, b) {
		var c = a[0];
		if(c && c.complete && c.clientWidth)
			b();
		else
			c.onLoad = function() {
				setTimeout(b, 100)
			}
	}

	var r = "inner", l = /^.+\.(?:jpg|png|gif)$/i, d = Math.round, p = Math.min, e;
	k.ATTRS = {
		width : {
			valueFn : function() {
				return this.get("imageWidth")
			}
		},
		height : {
			valueFn : function() {
				return this.get("imageHeight")
			}
		},
		elCls : {
			value : "ks-imagezoom-viewer"
		},
		elStyle : {
			value : {
				overflow : "hidden",
				position : "absolute"
			}
		},
		type : {
			value : "standard"
		},
		preload : {
			value : true
		},
		bigImageSrc : {
			setter : function(a) {
				if(a)
					return a;
				return this.get("bigImageSrc")
			},
			valueFn : function() {
				var a = this.get("imageNode");
				if(a)
					if(( a = a.attr("data-ks-imagezoom")))
						return a;
				return g
			}
		},
		bigImageWidth : {
			valueFn : function() {
				var a = this.bigImage;
				return ( a = a && a.width()) || 800
			}
		},
		bigImageHeight : {
			valueFn : function() {
				var a = this.bigImage;
				return ( a = a && a.height()) || 800
			}
		},
		currentMouse : {
			value : g
		},
		lensClass : {
			value : "ks-imagezoom-lens"
		},
		lensHeight : {
			value : g
		},
		lensWidth : {
			value : g
		},
		lensTop : {
			value : g
		},
		lensLeft : {
			value : g
		}
	};
	k.HTML_PARSER = {};
	j.augment(k, {
		__renderUI : function() {
			var a = this, b;
			a.viewer = a.get("contentEl");
			b = a.bigImage = (new m('<img src="' + a.get("bigImageSrc") + '" />')).css("position", "absolute").appendTo(a.viewer);
			a._setLensSize();
			a._setLensOffset();
			if(a._isInner) {
				a.set("align", {
					node : a.image,
					points : ["cc", "cc"]
				});
				a._bigImageCopy = (new m('<img src="' + a.image.attr("src") + '"  />')).css("position", "absolute").width(a.get("bigImageWidth")).height(a.get("bigImageHeight")).prependTo(a.viewer)
			} else
				a.lens = (new m('<div class="' + a.get("lensClass") + '"></div>')).css("position", "absolute").appendTo(e).hide();
			a.viewer.appendTo(a.get("el"));
			a.loading();
			o(b, function() {
				a.unloading();
				a._setLensSize();
				a.set("bigImageWidth", b.width());
				a.set("bigImageHeight", b.height())
			})
		},
		__bindUI : function() {
			var a = this;
			a.on("afterVisibleChange", function(b) {
				if(b.newVal) {
					a._isInner && a._anim(0.4, 42);
					e.on("mousemove", a._mouseMove, a)
				} else {
					( b = a.lens) && b.hide();
					e.detach("mousemove", a._mouseMove, a)
				}
			})
		},
		__syncUI : function() {
		},
		__destructor : function() {
			this.viewer.remove();
			this.lens.remove()
		},
		_setLensSize : function() {
			var a = this.get("imageWidth"), b = this.get("imageHeight"), c = this.get("bigImageWidth"), h = this.get("bigImageHeight"), f = this.get("width"), q = this.get("height");
			this.set("lensWidth", p(d(f * a / c), a));
			this.set("lensHeight", p(d(q * b / h), b))
		},
		_setLensOffset : function(a) {
			a = a || this.get("currentMouse");
			var b = this.get("imageLeft"), c = this.get("imageTop"), h = this.get("imageWidth"), f = this.get("imageHeight");
			this.get("width");
			this.get("height");
			var q = this.get("lensWidth"), n = this.get("lensHeight"), i = a.pageX - q / 2;
			a = a.pageY - n / 2;
			if(i <= b)
				i = b;
			else if(i >= h + b - q)
				i = h + b - q;
			if(a <= c)
				a = c;
			else if(a >= f + c - n)
				a = f + c - n;
			this.set("lensLeft", i);
			this.set("lensTop", a)
		},
		_mouseMove : function(a) {
			var b = this.get("imageLeft"), c = this.get("imageTop"), h = this.get("imageWidth"), f = this.get("imageHeight");
			a.pageX > b && a.pageX < b + h && a.pageY > c && a.pageY < c + f ? this.set("currentMouse", a) : this.hide()
		},
		_anim : function(a, b) {
			var c = this, h, f = 1;
			h = c.get("imageLeft");
			var q = c.get("imageTop"), n = c.get("imageWidth"), i = c.get("imageHeight"), v = c.get("bigImageWidth"), w = c.get("bigImageHeight"), x = -d((c.get("lensLeft") - h) * v / n), y = -d((c.get("lensTop") - q) * w / i), s, t, u;
			c._animTimer && c._animTimer.cancel();
			c.bigImage.width(n).height(i);
			c._bigImageCopy.width(n).height(i);
			c._animTimer = j.later( h = function() {
				s = n + (v - n) / b * f;
				t = i + (w - i) / b * f;
				u = {
					left : x / b * f,
					top : y / b * f
				};
				c.bigImage.width(s).height(t).css(u);
				c._bigImageCopy.width(s).height(t).css(u);
				if(++f > b) {
					c._animTimer.cancel();
					c._animTimer = g
				}
			}, a * 1E3 / b, true);
			h()
		},
		_uiSetCurrentMouse : function(a) {
			if(!(!this.bigImage || this._animTimer)) {
				var b = this.lens;
				b && b.show();
				this._setLensOffset(a);
				a = {
					left : -d((this.get("lensLeft") - this.get("imageLeft")) * this.get("bigImageWidth") / this.get("imageWidth")),
					top : -d((this.get("lensTop") - this.get("imageTop")) * this.get("bigImageHeight") / this.get("imageHeight"))
				};
				this._bigImageCopy && this._bigImageCopy.css(a);
				this.bigImage.css(a)
			}
		},
		_uiSetLensWidth : function(a) {
			this.lens && this.lens.width(a)
		},
		_uiSetLensHeight : function(a) {
			this.lens && this.lens.height(a)
		},
		_uiSetLensTop : function(a) {
			this.lens && this.lens.offset({
				top : a
			})
		},
		_uiSetLensLeft : function(a) {
			this.lens && this.lens.offset({
				left : a
			})
		},
		_uiSetBigImageWidth : function(a) {
			a && this.bigImage && this.bigImage.width(a);
			a && this._bigImageCopy && this._bigImageCopy.width(a)
		},
		_uiSetBigImageHeight : function(a) {
			a && this.bigImage && this.bigImage.height(a);
			a && this._bigImageCopy && this._bigImageCopy.height(a)
		},
		_uiSetBigImageSrc : function(a) {
			a && this.bigImage && this.bigImage.attr("src", a);
			a && this._bigImageCopy && this._bigImageCopy.attr("src", a)
		},
		changeImageSrc : function(a) {
			this.image.attr("src", a);
			this.loading()
		},
		refreshRegion : function() {
			this._fresh = this.get("align");
			this.set("align", g)
		}
	});
	k.__imgOnLoad = o;
	return k
}, {
	requires : ["node"]
});
KISSY.add("imagezoom/base", function(j, m, g, k, o, r, l, d, p) {
	function e(a) {
		return j.require("uibase/" + a)
	}
	return r.create([e("boxrender"), e("contentboxrender"), e("positionrender"), e("loadingrender"), k.ie == 6 ? e("shimrender") : null, e("align"), e("maskrender"), d], {
		initializer : function() {
			var a = this, b;
			( b = a.image = a.get("imageNode")) && d.__imgOnLoad(b, function() {
				if(!a.imageWrap) {
					a._render();
					a._bind()
				}
			})
		},
		destructor : function() {
			this.image.detach()
		},
		_render : function() {
			var a = this.image, b = a.parent();
			if(b.css("display") !== "inline")
				b = a;
			this.imageWrap = (new l(j.substitute("<div class='{wrapClass}'></div>", {
				wrapClass : this.get("wrapClass")
			}))).insertBefore(b);
			this.imageWrap.prepend(b);
			if(this.get("showIcon")) {
				this.icon = new l(j.substitute("<span class='{iconClass}'></span>", {
					iconClass : this.get("iconClass")
				}));
				this.imageWrap.append(this.icon)
			}
		},
		_bind : function() {
			var a = this, b;
			a.image.on("mouseenter", function(c) {
				if(a.get("hasZoom"))
					b = j.later(function() {
						a.set("currentMouse", c);
						if(a._fresh) {
							a.set("align", a._fresh);
							a._fresh = p
						}
						a.show();
						b = p
					}, 50)
			}).on("mouseleave", function() {
				if(b) {
					b.cancel();
					b = p
				}
			});
			a.on("afterVisibleChange", function(c) {
				if(c.newVal)
					( c = a.icon) && c.hide();
				else
					( c = a.icon) && c.show()
			})
		},
		_uiSetHasZoom : function(a) {
			if(a)
				( a = this.icon) && a.show();
			else
				( a = this.icon) && a.hide()
		}
	}, {
		ATTRS : {
			imageNode : {
				setter : function(a) {
					return l.one(a)
				}
			},
			wrapClass : {
				value : "ks-imagezoom-wrap"
			},
			imageWidth : {
				valueFn : function() {
					var a = this.get("imageNode");
					return ( a = a && a.width()) || 400
				}
			},
			imageHeight : {
				valueFn : function() {
					var a = this.get("imageNode");
					return ( a = a && a.height()) || 400
				}
			},
			imageLeft : {
				valueFn : function() {
					var a = this.get("imageNode");
					return ( a = a && a.offset().left) || 400
				}
			},
			imageTop : {
				valueFn : function() {
					var a = this.get("imageNode");
					return ( a = a && a.offset().top) || 400
				}
			},
			hasZoom : {
				value : true,
				setter : function(a) {
					return !!a
				}
			},
			showIcon : {
				value : true
			},
			iconClass : {
				value : "ks-imagezoom-icon"
			},
			prefixCls : {
				value : "ks-"
			}
		}
	})
}, {
	requires : ["dom", "event", "ua", "anim", "uibase", "node", "imagezoom/zoomer"]
});
KISSY.add("imagezoom/autorender", function(j, m, g, k) {
	k.autoRender = function(o, r) {
		o = "." + (o || "KS_Widget");
		m.query(o, r).each(function(l) {
			var d;
			if(l.getAttribute("data-widget-type") === "ImageZoom")
				try {
					if( d = l.getAttribute("data-widget-config"))
						d = d.replace(/'/g, '"');
					new k(l, g.parse(d))
				} catch(p) {
				}
		})
	}
}, {
	requires : ["dom", "json", "imagezoom/base"]
});
KISSY.add("imagezoom", function(j, m) {
	return j.ImageZoom = m
}, {
	requires : ["imagezoom/base", "imagezoom/autorender"]
});
