(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["register"],{"0c99":function(e,r,t){"use strict";t.r(r);var n=function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("div",{staticClass:"register"},[t("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,"status-icon":"",rules:e.rules,"label-width":"80px","label-position":"top"}},[t("el-form-item",{attrs:{label:"用户名",prop:"username"}},[t("el-input",{attrs:{type:"primary",autocomplete:"off"},model:{value:e.ruleForm.username,callback:function(r){e.$set(e.ruleForm,"username",r)},expression:"ruleForm.username"}})],1),t("el-form-item",{attrs:{label:"密码",prop:"pass"}},[t("el-input",{attrs:{type:"password",autocomplete:"off"},model:{value:e.ruleForm.pass,callback:function(r){e.$set(e.ruleForm,"pass",r)},expression:"ruleForm.pass"}})],1),t("el-form-item",{attrs:{label:"确认密码",prop:"checkPass"}},[t("el-input",{attrs:{type:"password",autocomplete:"off"},model:{value:e.ruleForm.checkPass,callback:function(r){e.$set(e.ruleForm,"checkPass",r)},expression:"ruleForm.checkPass"}})],1),t("el-form-item",{attrs:{label:"昵称",prop:"nickname"}},[t("el-input",{model:{value:e.ruleForm.nickname,callback:function(r){e.$set(e.ruleForm,"nickname",e._n(r))},expression:"ruleForm.nickname"}})],1),t("el-form-item",[t("el-button",{attrs:{type:"primary",loading:e.isLoginLoading},on:{click:function(r){return e.submitForm("ruleForm")}}},[e._v("提交")]),t("br"),t("br"),t("el-button",{on:{click:function(r){return e.resetForm("ruleForm")}}},[e._v("重置")])],1)],1)],1)},o=[],s=t("1da1"),a=(t("96cf"),t("ac1f"),t("00b4"),t("93d6")),i={data:function(){var e=this,r=function(r,t,n){if(!t)return n(new Error("用户名不能为空"));setTimeout((function(){e.isValid(t)?n():n(new Error("用户名只能由数字、字母和下划线组成"))}),1e3)},t=function(r,t,n){if(!t)return n(new Error("昵称不能为空"));setTimeout((function(){e.isValid2(t)?n():n(new Error("用户昵称只能由数字、字母和汉字组成"))}),1e3)},n=function(r,t,n){""===t?n(new Error("请输入密码")):(""!==e.ruleForm.checkPass&&e.$refs.ruleForm.validateField("checkPass"),n())},o=function(r,t,n){""===t?n(new Error("请再次输入密码")):t!==e.ruleForm.pass?n(new Error("两次输入密码不一致!")):n()};return{isLoginLoading:!1,ruleForm:{nickname:"",username:"",pass:"",checkPass:""},rules:{pass:[{validator:n,trigger:"blur"},{min:6,max:18,message:"密码长度为 6 到 18 位",trigger:"blur"}],checkPass:[{validator:o,trigger:"blur"}],username:[{validator:r,trigger:"blur"}],nickname:[{validator:t,trigger:"blur"}]}}},methods:{isValid:function(e){return/^\w+$/.test(e)},isValid2:function(e){return/^(\w|[\u4E00-\u9FA5])*$/.test(e)},submitForm:function(e){var r=this;return Object(s["a"])(regeneratorRuntime.mark((function e(){var t,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,r.$refs.ruleForm.validate();case 2:return r.isLoginLoading=!0,e.next=5,Object(a["c"])(r.ruleForm);case 5:t=e.sent,n=t.data,r.isLoginLoading=!1,2e4===n.code?(r.$message.success("注册成功"),r.$router.push("login")):r.$message.error("用户名重复");case 9:case"end":return e.stop()}}),e)})))()},resetForm:function(e){this.$refs[e].resetFields()}}},u=i,l=(t("ffbc"),t("2877")),c=Object(l["a"])(u,n,o,!1,null,"d515b698",null);r["default"]=c.exports},5943:function(e,r,t){},"93d6":function(e,r,t){"use strict";t.d(r,"b",(function(){return s})),t.d(r,"c",(function(){return a})),t.d(r,"a",(function(){return i}));t("e9c4");var n=t("b775"),o=(t("7733"),t("4360")),s=function(e){return Object(n["a"])({headers:{"Content-Type":"application/json"},method:"POST",url:"http://139.196.157.116:7788/Glogin/login/login",data:JSON.stringify(e)})},a=function(e){return Object(n["a"])({headers:{"Content-Type":"application/json"},method:"POST",url:"http://139.196.157.116:7788/Glogin/login/register",data:JSON.stringify(e)})},i=function(){return Object(n["a"])({method:"GET",url:"http://139.196.157.116:7788/Glogin/login/getInfo",params:{username:o["a"].state.user.username}})}},ffbc:function(e,r,t){"use strict";t("5943")}}]);
//# sourceMappingURL=register.8ed53235.js.map