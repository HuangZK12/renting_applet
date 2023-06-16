<!-- 首页 -->
<template>
	<button open-type="getAuthorize" scope="userInfo" @getAuthorize="getPhoneNumber"
		onError="handleAuthError">登录</button>
</template>

<script setup>
const getPhoneNumber = () => {
	my.getOpenUserInfo({
		success: (res) => {
			console.log('--res>>', JSON.parse(res.response).response);
		},
		fail: (err) => {
			console.log(err)
		}
	});
}
const handleAuthError = (err) => {
	 console.log('--err>>',err);
}
</script>

<style lang="scss" scoped></style>