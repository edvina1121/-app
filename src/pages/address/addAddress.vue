<template>
	<div>
		<div class="navbar">
			<div class="left">
				<a><i class="iconfont icon-arrow-lift" @click="goback"></i></a>
			</div>
			<div class="right">添加收获地址</div>
		</div>
		<div class="addAddress">
			<mt-field label="收货人" placeholder="请输入收货人" v-model="formData.name" class="name"></mt-field><br>
			<mt-field label="联系电话" placeholder="请输入联系电话" type="tel" v-model="formData.phone" class="phone"></mt-field><br>
			<div class="page-content">
				<mt-cell title="省市区:" :value="areaString" is-link @click.native="handlerArea"></mt-cell>
				<mt-popup v-model="areaVisible" class="area-class" position="bottom">
					<mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
				</mt-popup>
			</div><br>
			<mt-field label="详细地址" placeholder="请输入详细地址" type="textarea" v-model="formData.content" class="address"></mt-field>
		</div>
		<div class="btn" @click="save">
			保存
		</div>
	</div>
</template>

<script>
	import data from '@/assets/data/address.json'
	import { Field, Toast } from 'mint-ui';
	let index = 0
	let index2 = 0
	let index3 = 0
	// 初始化省
	let province = data.map(res => {
		return res.name
	})
	// 初始化市
	let city = data[index].childs.map(res => {
		return res.name
	})
	// 初始化区
	let area = data[index].childs[index2].childs.map(res => {
		return res.name
	})
	export default {
		name: 'addAddress',
		methods: {
			goback() {
				// 返回历史对象window.history.go(-1)的上一页
				this.$router.go(-1);
			},
			handlerArea() {
				this.areaVisible = true;
			},
			onValuesChange(picker, values) {
				let one = values[0]; // 获得省的值
				let two = values[1]; // 获得市的值
				let three = values[2]; // 获得区的值
				index = province.indexOf(one); // 通过省的值获得对应的索引
				if(index >= 0 && province.length > 0) {
					city = data[index].childs.map(res => {
						//重新加市
						return res.name;
					});
					picker.setSlotValues(1, city); //重新渲染城市的框中
					two = values[1]; // 重新获得获得市的值
				}

				index2 = city.indexOf(two); // 获得城市对应的索引
				if(index2 >= 0 && city.length > 0) {
					area = data[index].childs[index2].childs.map(res => {
						//重新加载地区
						return res.name;
					});
					picker.setSlotValues(2, area); //重新渲染地区的框中
					three = values[2]; // 重新获得获得地区的值
				}
				this.areaString = values.join(","); // 重要, 将所有的值写到文本框中
				console.log(this.areaString);
			},
			testPhone(phone) {
				return /^1[1|3|4|5|7|8][0-9]{9}$/.test(phone);
			},
			save() {
				if(
					this.formData.name == undefined ||
					this.formData.name == "" ||
					this.formData.name == null
				) {
					Toast("请输入收货人");
					return;
				}
				if(!this.testPhone(this.formData.phone)) {
					Toast("手机号格式不正确");
					return;
				}

				if(this.addressId == undefined) {
					this.addressId = "";
				}
				console.log(this.addressId);
				var areaStringToArray = this.areaString.split(",");
				this.$axios({
						method: "post",
						url: "http://localhost:3000/address/createOrUpdate",
						headers: {
							"content-type": "application/json;charset=UTF-8"
						},
						params: {
							//query  ?addressId=this.addressId
							addressId: this.addressId
						},
						data: {
							// body   post表单传输

							userId: this.userId,
							receiver: this.formData.name,
							mobile: this.formData.phone,
							province: areaStringToArray[0],
							city: areaStringToArray[1],
							district: areaStringToArray[2],
							descAddress: this.formData.content
						},
						dataType: "json"
					})
					.then(res => {
						console.log(res.data);
						this.$router.push("/addressList");
					})
					.catch(err => {
						console.log(err);
					});
			}
		},
		data() {
			return {
				userId: "",
				addressOne: [],
				addressId: "",
				areaVisible: false,
				areaString: "请选择",
				province: "",
				city: "",
				district: "",
				formData: {
					phone: null,
					name: null,
					content: null
				},
				slots: [{
						flex: 1,
						values: province,
						className: "slot1",
						textAlign: "left"
					},
					{
						divider: true,
						content: "-",
						className: "slot2"
					},
					{
						flex: 1,
						values: city,
						className: "slot3",
						textAlign: "left"
					},
					{
						divider: true,
						content: "-",
						className: "slot4"
					},
					{
						flex: 1,
						values: area,
						className: "slot5",
						textAlign: "left"
					}
				]
			};
		},
		mounted() {
			this.addressId = this.$route.query.id;
			// 获得用户信息
			if(!window.localStorage.getItem("userinfo")) {
				MessageBox.alert("您尚未登录!").then(action => {
					this.$router.push("/login");
				});
			} else {
				this.userId = JSON.parse(localStorage.getItem("userinfo"))[0]._id;
			}
			//console.log(this.$route.query);
			// 更新,如果有id 去调用 通过id查找的地址信息，获得唯一的信息后将值添加到文本框中
			if(
				this.addressId != null &&
				this.addressId != undefined &&
				this.addressId != ""
			) {
				this.$axios
					.get(
						"http://localhost:3000/address/fetch?userId=" +
						this.userId +
						"&addressId=" +
						this.addressId
					)
					.then(res => {
						console.log(res.data.data);
						this.addressOne = res.data.data;
						this.areaString =
							res.data.data.province +
							"," +
							res.data.data.city +
							"," +
							res.data.data.district;
						console.log(this.areaString);
						this.formData = {
							phone: this.addressOne.phone,
							name: this.addressOne.name,
							content: this.addressOne.addressInfo
						};
					})
					.catch(err => {
						console.log(err);
					});
			}
		}
	}
</script>

<style scoped lang="css">
	.navbar {
		width: 100%;
		height: 50px;
		border-bottom: 1px solid #D0E9C6;
		display: flex;
	}
	
	.navbar .left {
		width: 50px;
		height: 50px;
		line-height: 50px;
		text-align: center;
		float: left;
	}
	
	.navbar .left .iconfont {
		font-size: 24px;
	}
	
	.navbar .right {
		flex: 1;
		text-align: center;
		line-height: 50px;
		font-size: 18px;
		padding-right: 35px;
	}
	
	.addAddress {
		margin: 0 10px;
	}
	
	.addAddress .name {
		height: 50px;
	}
	
	.addAddress .phone {
		height: 50px;
	}
	
	.addAddress .page-content {
		height: 50px;
	}
	
	.addAddress .page-content .area-class {
		width: 100%;
		height: 50%;
	}
	
	.addAddress .address {
		height: 50px;
		font-size: 18px;
	}
	
	.btn {
		width: 100%;
		height: 60px;
		background: #FF0900;
		position: fixed;
		z-index: 100;
		bottom: 0;
		left: 0;
		right: 0;
		font-size: 20px;
		line-height: 60px;
		text-align: center;
		color: #Fff;
	}
</style>