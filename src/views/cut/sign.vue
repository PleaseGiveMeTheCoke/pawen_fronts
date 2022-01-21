<template>
  <div class="sign">
    
      <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
    <el-tab-pane v-for="(item,i1) in tags" v-bind:key="i1" :label="item" :name="i1"  >
      <form :id="`form${i1}`">
      <div style="font-weight:bold">名词</div>
      <br>
      <div class="divv" v-for="(item,i) in nouns"  v-bind:key="i">
        {{item}}
        <input  type="checkbox" :name="`nouns${i1}`" :value="item"/>
      </div>
       <div style="font-weight:bold">动词</div>
      <div class="divv" v-for="(item,i) in verbs"  v-bind:key="i">
        {{item}}
        <input  type="checkbox" :name="`verbs${i1}`" :value="item"/>
      </div>
      <div style="font-weight:bold">形容词</div>
      <div class="divv" v-for="(item,i) in adjs"  v-bind:key="i">
        {{item}}
        <input  type="checkbox" :name="`adjs${i1}`" :value="item"/>
      </div>
        <el-button type="primary" @click="formSubmit">提交按钮</el-button>
        </form>
    </el-tab-pane>
  </el-tabs>

  </div>
</template>

<script>
import request from '@/utils/request'
export default {
    data(){
      return{
      tags:[],
      nouns : [],
      verbs : null,
      adjs : null,
      content: null,
      activeName: '2'
      }
    },
  name: 'sign',
  created(){
    this.getCutRes();
  },
  methods:{
    formSubmit(){
        var len = this.tags.length;
        var res = "";
        console.log(len)
        for(var i = 0;i<len;i++){
          res+="form"+i+"_n:";
          var nouns = document.getElementsByName("nouns"+i)
        
           for (let index2 = 0; index2 < nouns.length; index2++) {
                    if(nouns[index2].checked){
                       res+=nouns[index2].value+","
                    }
           }
        res+="}";
        res+="form"+i+"_v:";
         var verbs = document.getElementsByName("verbs"+i)
         for (let index2 = 0; index2 < verbs.length; index2++) {
                    if(verbs[index2].checked){
                       res+=verbs[index2].value+","
                    }
           }
        res+="}"; 
        res+="form"+i+"_a:";
        var adjs = document.getElementsByName("adjs"+i)
         for (let index2 = 0; index2 < adjs.length; index2++) {
                    if(adjs[index2].checked){
                       res+=adjs[index2].value+","
                    }
           }
           res+="}";
        }
        res = this.tags+"-"+res;
        window.location.href = "http://localhost:6867/save/saveFile/"+res
        this.$emit("end",true)
        this.$router.push({
          name:'chooseFile'
        })

    },
    handleClick(tab) {
        console.log(tab.name);
        let aa=document.getElementById("form"+tab.name);
        aa.getElementsByTagName('input');  
        console.log(aa)
      },
      getCutRes(){
      
        this.tags = this.$route.params.tags;
        var file = this.$route.params.file;
        var formData = new FormData();
        formData.append("url",file.url)
        request({
        method: 'post',
        url: "http://localhost:7788/Gcutword/cut/cutword",
        data: formData
        }).then(data => {
            var datas = data.data.data;
            
            var a1 = datas.indexOf("V");
            var a2 = datas.indexOf("A");
            var a3 = datas.indexOf("C");
            this.nouns = datas.substring(1,a1).replaceAll(/\"/g,"").replaceAll("[","").replaceAll("]","").split(",");;
            this.verbs = datas.substring(a1+1,a2).replaceAll(/\"/g,"").replaceAll("[","").replaceAll("]","").split(",");;
            this.adjs = datas.substring(a2+1,a3).replaceAll(/\"/g,"").replaceAll("[","").replaceAll("]","").split(",");;
            this.content = datas.substring(a3+1);
          
          
        })
      },
  }
}
</script>

<style>
.divv{
  display:inline-block;
  margin: 15px
}
</style>