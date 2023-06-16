<script>
export default {
	onLaunch: function () {
		console.log('App Launch')
	},
	onShow: function () {
		console.log('App Show')
	},
	onHide: function () {
		console.log('App Hide')
	}
}
</script>
<style lang="scss">
@import "@/uni_modules/uview-plus/index.scss";
@import './common/css/reset.scss';
@import './common/css/atomic.scss';
$u-primary: red;
$u-warning: #f9ae3d;
$u-success: #5ac725;
$u-error: #f56c6c;
$u-info: #909399;
</style>