<template>
  <!-- const backGroundImage = computed<string>(() => `--img-bg: url('${avatar}')`); --> 
    <div class="app" flex items-center justify-center h-screen bg="cover center no-repeat" :style="coolImage" w-screen>
      <div v-if = "!loginStatus" w="4/5">
        <form @submit.prevent="submitLoginForm" flex="~ col" w="30vw" gap-y-4>
            <input w-full rounded-full px-4 py-3 border="solid 1px gray-400" v-model="phone" type="phone" placeholder="手機號碼(ex:0988123456)" required />
            <input w-full rounded-full px-4 py-3 border="solid 1px gray-400" v-model="code" type="text" placeholder="驗證碼(第一次登入會發送驗證碼)" required />
            <button w-full aria-label="this is a button" box-border cursor-pointer rounded-md border-none px-3 py-2 text="hover:white" bg="red-400 hover:red-800" type="submit">送出</button>
        </form>
      </div>
  
  
  
      <div v-if = "loginStatus && !giftStatus" w-full flex="~ col" items-center justify-center>
        <h1 text="3xl white" bg="black/70" px-4 py-3 rounded-xl>請填寫您想要的禮物提示於下方</h1>
        <form @submit.prevent="submitForm" flex="~ col" gap-y-4 w="1/2">
          <input w-full rounded-full px-4 py-3 border="solid 1px gray-400" v-model="shape" type="text" placeholder="請輸入禮物的形狀" required />
          <input w-full rounded-full px-4 py-3 border="solid 1px gray-400" v-model="adj" type="text" placeholder="請輸入形容禮物的兩個形容詞" required />
          <input w-full rounded-full px-4 py-3 border="solid 1px gray-400" v-model="abc" type="text" placeholder="請輸入禮物全名的注音聲母(ex:電鍋 ->ㄉㄍ)" required />
          <input w-full rounded-full px-4 py-3 border="solid 1px gray-400" v-model="ans" type="text" placeholder="請輸入禮物全名" required />
          <button aria-label="this is a button" box-border cursor-pointer rounded-md border-none px-3 py-2 text="hover:white" bg="#D3FBBD hover:#14518B" type="submit">送出</button>
        </form>
      </div>
  
      <div v-if="giftStatus" space-y-4 w="30vw" text-3xl>
  
        <div data-testid="area" rounded-lg px-4 py-3 border="solid 1px gray-500" bg="#B1A1FF">
          <strong>禮物形狀：</strong>{{ giftHint.shape }}
        </div>
        <div class="hint-item" data-testid="area" rounded-lg px-4 py-3 border="solid 1px gray-500" bg="#B1A1FF">
            <strong>禮物形容詞：</strong>{{ giftHint.adj }}
        </div>
        <div class="hint-item" data-testid="area" rounded-lg px-4 py-3 border="solid 1px gray-500" bg="#B1A1FF">
            <strong>禮物字母組合：</strong>{{ giftHint.abc }}
        </div>
        
        <div space-x-4>
          <input v-model="checkAns" type="text" placeholder="答案" text="placeholder:white" required px-3 py-2 rounded-full bg="#F9C236" border="solid 1px #FFD55A" outline-none />
    
          <button @click="checkAnswer" aria-label="this is a button" box-border cursor-pointer rounded-md border-none px-3 py-2 text="hover:white" bg="#924317 hover:#8d6942">確認答案</button>
        </div>
       
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import image from '~/public/cool.webp'
  
  const shape = ref('')
  const adj = ref('')
  const abc = ref('')
  const ans = ref('')
  const response = ref()
  
  const coolImage = computed(() => {
    return `background-image: url('${image}')`
  });
  
  async function submitForm() {
    try {
      const res = await $fetch('https://admin.petskeeper.com.tw/api/christmas/store', {
        method: 'POST',
        body: { shape: shape.value, adj: adj.value, abc: abc.value, ans: ans.value, phone: phone.value },
      })
      
      alert(res.message)
      
    } catch (error) {
      response.value = { error: error.message }
    }
  }
  
  const phone = ref('')
  const code = ref('')
  const loginStatus = ref(false) 
  const giftHint = ref({})
  const giftStatus = ref(false)
  
  async function submitLoginForm() {
    try {
      const res = await $fetch('https://admin.petskeeper.com.tw/api/christmas/login', {
        method: 'POST',
        body: { phone: phone.value, code: code.value },
      })
  
      if(res.status ){
        loginStatus.value = true
  
        if(res.giftStatus){
            console.log(res)
          giftStatus.value = res.giftStatus
          giftHint.value = res.giftHint
        }
      } else {
        alert(res.message)
      }
    } catch (error) {
      response.value = { error: error.message }
    }
  }
  
  const checkAns = ref();
  
  const checkAnswer = () => {
    if(checkAns.value == giftHint.value.ans){
      alert('答對了')
    } else {
      alert('答錯了')
    }
  }
  </script>
  
<style>

</style>
  
