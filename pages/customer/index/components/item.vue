<template>
	<navigator class="bg-white margin-bottom-sm" :url="`/pages/customer/detail/index?id=${bean.id}`">
			<view class="content flex align-center padding-tb-xs padding-lr-sm">
				<view class="margin-right-sm">
					<ava :name="bean.name"></ava>
				</view>
				<view class="content">
					<view>
						{{bean.name}}{{bean.belongsto_id ? `[${bean.belongsto_type}]`: ''}}
					</view>
					<view>{{bean.last_genjin_time | moment('from')}}</view>
					<view>{{bean.desireRatio}}</view>
					<view>客户星级：{{bean.star}}</view>
					<view>录入时间：{{bean.created_at}}</view>
				</view>
			</view>
	</navigator>
</template>

<script>
	import Ava from '@/components/avatar.vue'
	export default {
		props: {
			bean: {
				type: Object
			}
		},
		data: _ => ({
			bean1: {
				age: 178,
				area_id: null,
				areas: [],
				belongsto_date: "2019-07-17",
				belongsto_id: 2,
				belongsto_type: "首录",
				buy_or_rent: null,
				buy_or_rent_name: null,
				can_release: true,
				city: [],
				city_id: null,
				company_id: 1002,
				complete_ratio: 33,
				created_at: "2019-07-17 13:19:06",
				current_address: "",
				current_area_id: null,
				current_city_id: null,
				current_district_id: null,
				current_province_id: null,
				current_residence: "",
				customer_code: null,
				customer_distributor: null,
				customer_type: "初步接触",
				daikans_count: 1,
				delete_reason: "111111",
				deleted_at: null,
				demand_tag: ["写字楼"],
				desire_ratio: 23,
				distributor_protect: false,
				district_id: null,
				email: "",
				finance_all_in: "0.00",
				finance_all_out: "0.00",
				finance_all_total: "0.00",
				finance_in: "0.00",
				finance_out: "0.00",
				finance_total: "0.00",
				floor: "",
				from_company_id: null,
				from_id: null,
				groups: [],
				guanzhu: null,
				guanzhu_attr: [],
				house_using_type: [],
				id: 27,
				id_card: "",
				intention: 0,
				intention_attr: [],
				intention_house_type: null,
				intention_house_type_attr: [],
				is_share_to_me: false,
				job: 0,
				job_name: "",
				kangxing: null,
				kangxing_attr: [],
				last_genjin_time: "2019-07-30 15:34:36",
				name: "xinfang",
				need_info: null,
				need_type: null,
				need_workshop_ban: null,
				need_workshop_su: null,
				need_workshop_yuan: null,
				new_house_customer: false,
				next_genjin_at: "2019-08-27 15:34:36",
				orientation: "",
				payment_type: 0,
				payment_type_attr: [],
				phone: "13658744114",
				phone_reserve: "",
				price_end: null,
				price_start: null,
				private: true,
				project_id: null,
				qq: "",
				qudao: null,
				qudao_attr: [],
				release_time: "2019-08-29 15:34:36",
				remark: "",
				renovation: "",
				secret_phone: null,
				secret_phone_reserve: null,
				sex: "1",
				sex_name: "先生",
				shares_number: 0,
				sn: null,
				source: null,
				source_attr: [],
				star: 1,
				status: "",
				status_name: "有效",
				tax_reduction: "",
				term: "",
				transaction: 0,
				transaction_attr: [],
				type: "新房",
				type_name: "公",
				typed_name: "新房",
				typing_id: 2,
				updated_at: "2019-07-30 15:34:36",
				weixin: "",
			}
		}),
		components: {
			Ava
		}
	}
</script>

<style>
</style>
