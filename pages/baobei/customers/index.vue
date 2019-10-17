<template>
	<view>
		<view class="cu-bar bg-cyan search">
			<view class="search-form radius">
				<text class="cuIcon-search"></text>
				<input :adjust-position="false" type="text" placeholder="搜索姓名或者电话" confirm-type="search" v-model="searchVal" @confirm="searchInput"></input>
			</view>
		</view>
		<checkbox-group @change="handleChange" :style="{'display': 'block', 'height': '100vh'}">
			<data-list :r-url="rUrl" :r-data="rData" ref="list" @data="handleList">
				<view class="bg-white padding-sm solid-bottom" v-for="(i, inx) in list" :key="inx">
					<label class="flex">
						<view class="margin-right-sm">
							<checkbox 
								class='round blue'
								:class="i.checked?'checked':''"
								:checked="i.checked"
								:value="`${i[keys.name]} ${i[keys.phone]} ${i[keys.id]}`"
							/>
						</view>
						<view>
							<view class="text-black text-bold">{{i[keys.name]}}</view>
							<view class="text-gray text-sm">{{i[keys.phone]}}</view>
						</view>
					</label>
				</view>
			</data-list>
		</checkbox-group>
		<save @save="handleSave" />
	</view>
</template>

<script>
	import DataList from '@/components/data-list'
	import Save from '@/components/buttom-button'
	import { mapMutations, mapState } from 'vuex'
	
	export default {
		onLoad(opt) {
			this.type = opt.type
			if (this.type === 'history') {
				// this.rData = { baobeis_sub: [] }
                this.rUrl = 'baobei/my';
                this.keys = {
                    id: 'customer_id',
                    phone: 'customer_phone_display',
                    name: 'customer_name'
                }
			} else {
			    this.rData = {
			        belongsto_id: this.userInfo.id,
                    forSelect: true
                }
            }
			this.$nextTick(_ => {
				this.$refs.list.init()
			})
		},
		components: {
			DataList, Save
		},
		data() {
			return {
				type: '', //history my
				list: [],
				sels: [],
				rUrl: 'customer',
				rData: {
                    is_distinct_customer_id: true
                },
                keys: {
				    id: 'id',
                    name: 'name',
                    phone: 'phone'
                },
                searchVal: '',
                searchValBefore: '',
                isLoadMore: false,
                page: '',
                isEnd: false
			}
		},
        watch: {},
		methods: {
			...mapMutations('baobei', ['setSelCustomer']),
			handleList(list) {
				let temp = this.sels.map(i => i.split(' ')[2]);
				this.list = list.map(i =>{
					i.checked = temp.findIndex(id => id == i[this.keys.id]) > -1;
					return i
				});
                if (!this.searchVal) {
                    this.searchValBefore = JSON.stringify(this.list);
                    this.isEnd = this.$refs.list.isEnd;
                    this.page = this.$refs.list.page;
                }
			},
            searchInput() {
                let val = this.searchVal;
                let list = [];
                if (val) {
                    this.$refs.list.scrollTop = 1;
                    let data = JSON.stringify(Object.assign(this.rData, {keywords: val}));
                    this.rData = JSON.parse(data);
                } else {
                    let list = JSON.parse(this.searchValBefore);
                    Reflect.deleteProperty(this.rData, 'keywords');
                    this.$refs.list.list = list;
                    this.$refs.list.isEnd = this.isEnd;
                    this.$refs.list.page = this.page;
                    this.$refs.list.scrollTop = 0;
                    this.handleList(list);
                }
            },
			handleChange(e) {
				this.sels = e.detail.value;
                for (let i = 0, lenI = this.list.length; i < lenI; ++i) {
					this.list[i].checked = false;
					for (let j = 0, lenJ = this.sels.length; j < lenJ; ++j) {
						if (this.list[i][this.keys.id] == this.sels[j].split(' ')[2]) {
							this.list[i].checked = true;
							break
						}
					}
				}
				this.list = this.list.map(i => i);
			},
			handleSave() {
				let arr = [...this.selCustomer].filter(i => i.name || i.phone)
				for (let i of this.sels) {
					let [name, phone, id] = i.split(' ')
					arr.push({
						name, phone, id
					})
				}
				this.setSelCustomer(arr);
				uni.navigateBack()
			},
		},
		computed: {
			...mapState('baobei', ['selCustomer']),
            ...mapState(['userInfo'])
		}
	}
</script>

<style>
</style>
