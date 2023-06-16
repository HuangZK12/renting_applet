export function persist({ store }) {
	let initState = uni.$u.deepClone(store.$state);

	// 从缓存中读取
	const storageState = uni.getStorageSync(store.$id);
	if (storageState) {
		initState = storageState;
	}
	store.$state = initState;
	setTimeout(() => {
		store.$subscribe(() => {
		// 在存储变化的时候将store缓存
		uni.setStorageSync(store.$id, JSON.parse(JSON.stringify(store.$state)));
	});
	}, 2000);
}
/**
 * 这段代码是一个用于在uniapp中实现状态持久化的函数。
 * 具体来说，它会将store的初始状态从缓存中读取，如果缓存中没有则使用默认的初始状态。
 * 然后，它会将store的状态变化订阅起来，当状态发生变化时，将store的状态缓存到本地存储中。
 * 这样做的好处是，当应用程序重新加载时，store的状态可以从缓存中恢复，而不是从头开始重新构建。这可以提高应用程序的性能和用户体验。
 */