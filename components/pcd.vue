<template>
	<picker mode="multiSelector" :range="range" @columnchange="handleColumnChange" range-key="name" @change="handleChange"
	 :value='vAsync'>
		<view :class="['picker', lastStyle? 'last-style': '']" v-if="last">
			{{clearContent || pcdContent()}}
		</view>
        <view class="picker" v-else>
            {{title}}
        </view>
	</picker>
</template>

<script>
	let ps = [{
			name: "北京",
			id: 1
		},
		{
			name: "上海",
			id: 2
		},
		{
			name: "天津",
			id: 3
		},
		{
			name: "重庆",
			id: 4
		},
		{
			name: "安徽",
			id: 5
		},
		{
			name: "福建",
			id: 7
		},
		{
			name: "广东",
			id: 8
		},
		{
			name: "云南",
			id: 9
		},
		{
			name: "广西",
			id: 10
		},
		{
			name: "贵州",
			id: 11
		},
		{
			name: "甘肃",
			id: 12
		},
		{
			name: "海南",
			id: 13
		},
		{
			name: "河南",
			id: 14
		},
		{
			name: "黑龙江",
			id: 15
		},
		{
			name: "湖北",
			id: 16
		},
		{
			name: "湖南",
			id: 17
		},
		{
			name: "河北",
			id: 18
		},
		{
			name: "江苏",
			id: 19
		},
		{
			name: "江西",
			id: 20
		},
		{
			name: "吉林",
			id: 21
		},
		{
			name: "辽宁",
			id: 22
		},
		{
			name: "宁夏",
			id: 23
		},
		{
			name: "内蒙古",
			id: 24
		},
		{
			name: "青海",
			id: 25
		},
		{
			name: "山东",
			id: 26
		},
		{
			name: "山西",
			id: 27
		},
		{
			name: "陕西",
			id: 28
		},
		{
			name: "四川",
			id: 29
		},
		{
			name: "新疆",
			id: 30
		},
		{
			name: "西藏",
			id: 31
		},
		{
			name: "浙江",
			id: 32
		},
		{
			name: "香港",
			id: 33
		},
		{
			name: "澳门",
			id: 34
		},
		{
			name: "台湾",
			id: 35
		},
	]
    let unlimited = {
	    name: '不限',
        id: -10
    };
	export default {
		mounted() {
            if (this.level === 3) {
				this.range.splice(3, 1)
			}
			if (this.level === 2) {
				this.range.splice(2, 2)
			}
			this.$http(`cities/${ps[0].id}`)
				.then(r => {
				    let id = r[0].id;
				    if (this.unlimited) r.unshift(unlimited);
					this.range.splice(1, 1, r)
					if (this.level >= 3) {
						return this.$http(`districts/${id}`)
					}

				})
				.then(r => {
					if (r) {
                        let id = r[0].id;
                        if (this.unlimited) r.unshift(unlimited);
						this.range.splice(2, 1, r);
						if (this.level === 4) {
							return this.$http(`areas/${id}`)
						}
					}
				})
				.then(r => {
					if (r) {
						this.range.splice(3, 1, r)
					}
				})
		},
		props: {
			value: {
				type: Array,
                default: function() {
                    return []
                }
			},
			level: {
				type: Number,
				default: 4
			},
            last: {
			    type: Boolean,
                default: false
            },
            clearContent: {
			    type: String,
                default: ''
            },
            unlimited: {
			    type: Boolean,
                default: false
            },
            lastStyle: {
			    type: Boolean,
                default: false
            }
		},
		data() {
			return {
				range: [
					ps,
					[],
					[],
					[]
				],
				title: '选择地区',
				vAsync: [0, 0, 0, 0]
			}
		},
		methods: {
			handleColumnChange(e) {
				let {
					column,
					value
				} = e.detail
				switch (column) {
					case 0:
						this.vAsync = [value, 0, 0, 0]
						this.pChange(this.range[0][value].id)
						break
					case 1:
						this.vAsync = [this.vAsync[0], value, 0, 0]
						this.cChange(this.range[1][value].id)
						break
					case 2:
						this.vAsync = [this.vAsync[0], this.vAsync[1], value, 0]
						this.dChange(this.range[2][value].id)
						break
				}

			},
			handleChange(e) {
				let {
					value
				} = e.detail
				this.title = this.level === 4 ?
					`${this.range[0][value[0]].name},${this.range[1][value[1]].name},${this.range[2][value[2]].name},${this.range[3][value[3]].name}` :
					this.level === 3 ?
					`${this.range[0][value[0]].name},${this.range[1][value[1]].name},${this.range[2][value[2]].name}` :
					`${this.range[0][value[0]].name},${this.range[1][value[1]].name}`
				let data = this.level === 4 ? [this.range[0][value[0]].id, this.range[1][value[1]].id, this.range[2][value[2]].id,
						this.range[3][value[3]].id
					] :
					this.level === 3 ? [this.range[0][value[0]].id, this.range[1][value[1]].id, this.range[2][value[2]].id] : [this.range[
						0][value[0]].id, this.range[1][value[1]].id]
                this.$emit('input', data)
			},
			pChange(pId) {
				this.$http(`cities/${pId}`)
					.then(r => {
					    let id = r[0].id;
					    if (this.unlimited) r.unshift(unlimited);
						this.range.splice(1, 1, r)
						if (this.level >= 3) {
							return this.$http(`districts/${id}`)
						}
					})
					.then(r => {
						if (r) {
                            let id = r[0].id;
                            if (this.unlimited) r.unshift(unlimited);
							this.range.splice(2, 1, r)
							if (this.level === 4) {
								return this.$http(`areas/${id}`)
							}
						}

					})
					.then(r => {
						if (r) {
							this.range.splice(3, 1, r)
						}
					})
			},
			cChange(cId) {
				if (this.level >= 3) {
					this.$http(`districts/${cId}`)
						.then(r => {
                            let id = r[0].id;
                            if (this.unlimited) r.unshift(unlimited);
							this.range.splice(2, 1, r)
							if (this.level === 4) {
								return this.$http(`areas/${id}`)
							}
						})
						.then(r => {
							if (r) {
								this.range.splice(3, 1, r)
							}
						})
				}
			},
			dChange(dId) {
				if (this.level === 4) {
					this.$http(`areas/${dId}`)
						.then(r => {
							this.range.splice(3, 1, r)
						})
				}
			},
            pcdContent() {
			    let content = '';
			    let title = this.title;
                let regArr = title.match(/不限/g);
                let stringArr = title.split(',');
                let index = regArr === null? this.level - 1: this.level - regArr.length -1;
                content = stringArr[index];
                return content;
            }
		},
		watch: {
			value: {
				handler(v) {
                    if (v.length >= 3) {
						let v0, v1, v2, v3
						v0 = this.range[0].findIndex(i => i.id == v[0])
						this.$http(`cities/${v[0]}`)
							.then(r => {
							    let id = r[0].id;
							    if (this.unlimited) r.unshift(unlimited);
								this.range.splice(1, 1, r);
                                v1 = this.range[1].findIndex(i => i.id === v[1]);
                                let _v = v[1] === -10? v1: id;
								return this.$http(`districts/${_v}`)
							})
							.then(r => {
                                let id = r[0].id;
                                if (this.unlimited) r.unshift(unlimited);
								this.range.splice(2, 1, r)
								v2 = this.range[2].findIndex(i => i.id === v[2])
                                let _v = v[2] === -10? v1: id;
								if (this.level === 4) {
									return this.$http(`areas/${_v}`)
								} else if (this.level === 3) {
									this.vAsync = [v0, v1, v2];
                                    this.title =
										`${this.range[0][this.vAsync[0]].name},${this.range[1][this.vAsync[1]].name},${this.range[2][this.vAsync[2]].name}`
								}
							})
							.then(r => {
								if (r) {
                                    if (this.unlimited) r.unshift(unlimited);
									this.range.splice(3, 1, r)
									v3 = this.range[3].findIndex(i => i.id === v[3])
									this.vAsync = [v0, v1, v2, v3]
									this.title =
										`${this.range[0][this.vAsync[0]].name},${this.range[1][this.vAsync[1]].name},${this.range[2][this.vAsync[2]].name},${this.range[3][this.vAsync[3]].name}`
								}
							})
					}
				}
			}
		}
	}
</script>

<style scoped>
    .last-style {
        position: absolute !important;
        top: 0 !important;
        left: 0 !important;
        width: 100% !important;
        height: 100% !important;
        z-index: 1000 !important;
        line-height: 2 !important;
        text-indent: 6rpx !important;
    }
</style>
