<template>
  <div class="app-container">

    <div class="filter-container">
      <el-input
        v-model="listQuery.accountName"
        style="width: 200px;"
        class="filter-item"
        placeholder="公众号"
        @keyup.enter.native="handleFilter"/>

      <el-input
        v-model="listQuery.author"
        style="width: 200px;"
        class="filter-item"
        placeholder="作者"
        @keyup.enter.native="handleFilter"/>

      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
      <br>
      <br>
      <br>
    </div>

    <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label="ID" width="50">
        <template slot-scope="scope">
          {{ scope.$index+1 }}
        </template>
      </el-table-column>
      <el-table-column label="公众号" width="120">
        <template slot-scope="scope">
          {{ scope.row.accountName }}
        </template>
      </el-table-column>
      <el-table-column label="标题">
        <template slot-scope="scope">
          <el-tooltip placement="top">
            <div slot="content">{{ scope.row.digest }}</div>
            <a :href="scope.row.contentUrl" class="is-link" target="_blank" >{{ scope.row.title }}</a>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="作者" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="阅读数" align="center" width="80">
        <template slot-scope="scope">
          {{ scope.row.readNum }}
        </template>
      </el-table-column>
      <el-table-column label="点赞数" align="center" width="80">
        <template slot-scope="scope">
          {{ scope.row.likeNum }}
        </template>
      </el-table-column>
      <el-table-column label="留言数" align="center" width="80">
        <template slot-scope="scope">
          {{ scope.row.electedCommentNum }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="发布时间" width="160">
        <template slot-scope="scope">
          {{ scope.row.createTime }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="同步时间" width="160">
        <template slot-scope="scope">
          {{ scope.row.updatedAt }}
        </template>
      </el-table-column>
    </el-table>
    <br>
    <!--翻页工具条-->
    <div class="pagination-container">
      <el-pagination
        :current-page="listQuery.page"
        :total="total"
        :page-sizes="[20]"
        :page-size="listQuery.limit"
        layout="total, -> ,prev, pager, next, jumper"
        @current-change="handleCurrentChange"/>
    </div>
  </div>
</template>

<script>
import { getList } from '@/api/table'

export default {
  filters: {
  },
  data() {
    return {
      list: null,
      total: 0,
      listQuery: {
        accountName: '',
        author: '',
        page: 1,
        limit: 15
      },
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList(this.listQuery).then(response => {
        this.list = response.data.rows
        this.total = response.data.count
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.fetchData()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.fetchData()
    }
  }
}
</script>
