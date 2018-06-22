<template>
    <div class="app-container" v-loading.body="listLoading" element-loading-text="Loading">
        <el-form ref="form" :model="form" label-width="40px">
            <el-form-item label="日期">
                <el-select v-model="form.month" placeholder="请选择日期">
                    <el-option label="1个月" value="1"></el-option>
                    <el-option label="3个月" value="3"></el-option>
                    <el-option label="半年" value="6"></el-option>
                </el-select>
                <el-button type="primary" @click="search">查询</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="list"  border fit highlight-current-row>
            <el-table-column align="center" label='序号' width="95">
                <template slot-scope="scope"  align="center">
                    {{scope.$index+1}}
                </template>
            </el-table-column>
            <el-table-column label="终端号" align="center">
                <template slot-scope="scope" align="center">
                    {{scope.row.terminalNo}}
                </template>
            </el-table-column>
            <el-table-column label="代理商编号" align="center">
                <template slot-scope="scope">
                    <span>{{scope.row.agentNo}}</span>
                </template>
            </el-table-column>
            <el-table-column label="代理商名称"  align="center">
                <template slot-scope="scope">
                    <span>{{scope.row.agentName}}</span>
                </template>
            </el-table-column>
            <el-table-column label="商户编号" align="center">
                <template slot-scope="scope">
                    {{scope.row.merchantNo}}
                </template>
            </el-table-column>
            <el-table-column label="商户名称" align="center">
                <template slot-scope="scope">
                    {{scope.row.merchantName}}
                </template>
            </el-table-column>
            <el-table-column label="交易笔数" align="center">
                <template slot-scope="scope">
                    {{scope.row.total}}
                </template>
            </el-table-column>


        </el-table>

        <div class="pagination-container" v-if="!listLoading" style="margin-top: 20px;">
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page"
                           layout="total , prev, pager, next" :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
  import { tradeNumber } from '@/api/active'
  export default {
    components: {},
    data() {
      return {
        list: null,
        total: 0,
        listLoading: true,
        listQuery: {
          page: 1,
          limit: 10,
          month: 1
        },
        form: {
          month: '一个月'
        }
      }
    },
    filters: {
      statusFilter(status) {
        const statusMap = {
          published: 'success',
          draft: 'gray',
          deleted: 'danger'
        }
        return statusMap[status]
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      fetchData() {
        this.listLoading = true
        tradeNumber(this.listQuery).then(response => {
          this.list = response.result.list
          this.total = response.result.total
          this.listLoading = false
        })
      },
      handleSizeChange(val) {
        this.listQuery.limit = val
        this.fetchData()
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.fetchData()
      },
      search() {
        this.listQuery.month = this.form.month
        this.fetchData()
      }
    }
  }
</script>
