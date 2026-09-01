---
layout: page
---
<script setup lang="ts">
import {
  VPTeamPage,
  VPTeamPageTitle,
  VPTeamMembers,
  VPTeamPageSection
} from 'vitepress/theme'

// ===== 定义团队成员类型 =====
interface TeamMember {
  avatar: string
  name: string
  title?: string
  org?: string
  orgLink?: string
  desc?: string
  links?: { icon: string; link: string }[]
  sponsor?: string
  actionText?: string
}

const coreMembers: TeamMember[] = [
  {
    avatar: 'https://q.qlogo.cn/headimg_dl?dst_uin=3232227302&spec=640&img_type=jpg',
    name: 'King',
    title: '启梦主题核心开发者',
    org: '创启网络',
    orgLink: 'https://qiimeng.com/',
    desc: '负责主题核心架构、功能开发与性能优化',
    links: [
      { icon: 'bilibili', link: 'https://space.bilibili.com/3690995761810049' }
    ]
  },
  {
    avatar: 'https://q.qlogo.cn/headimg_dl?dst_uin=1467510054&spec=640&img_type=jpg',
    name: '小满1221',
    title: '启梦主题核心开发者 & 网站运维工程师',
    org: '萌尚网络',
    desc: '负责主题架构、功能测试、性能优化与官网运行维护',
    links: [
      { icon: 'github', link: 'https://github.com/xiaoman1221' },
      { icon: 'wordpress', link: 'https://www.yhdzz.cn' }
    ]
  }
]

const siteMembers: TeamMember[] = [
  {
    avatar: 'https://q.qlogo.cn/headimg_dl?dst_uin=108974129&spec=640&img_type=jpg',
    name: '阿城',
    title: '文档编辑作者 & 网站运维工程师',
    org: '莫尔豪斯网络',
    desc: '负责文档维护、UI优化与内容更新',
    links: [
      { icon: 'github', link: 'https://github.com/Morehouse-LLC' }
    ]
  },
  {
    avatar: 'https://q.qlogo.cn/headimg_dl?dst_uin=2122283465&spec=640&img_type=jpg',
    name: '水鱼AIE',
    title: '文档编辑作者',
    org: '莫尔豪斯网络',
    desc: '负责文档维护与内容更新',
    links: [
      { icon: 'github', link: 'https://github.com/fishw651-hub' }
    ]
  }
]

const supportMembers: TeamMember[] = [
  {
    avatar: 'https://q.qlogo.cn/headimg_dl?dst_uin=3524726858&spec=640&img_type=jpg',
    name: '断桥烟雨',
    title: '售前售后工程师',
    org: '千沐云网络',
    desc: '负责用户咨询、技术支持与售后服务',
    links: [
      { icon: 'github', link: 'https://github.com/688saer' }
    ]
  }
]
</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>我们的团队</template>
    <template #lead>一群热爱 WordPress 与 Typecho 的开发者与支持者</template>
  </VPTeamPageTitle>

  <!-- 核心开发者分组 -->
  <VPTeamPageSection>
    <template #title>核心开发者</template>
    <template #lead>主题的核心架构与功能实现</template>
    <template #members>
      <VPTeamMembers size="medium" :members="coreMembers"></VPTeamMembers>
    </template>
  </VPTeamPageSection>

  <!-- 网站维护分组 -->
  <VPTeamPageSection>
    <template #title>网站维护</template>
    <template #lead>保障站点稳定与文档更新</template>
    <template #members>
      <VPTeamMembers size="medium" :members="siteMembers"></VPTeamMembers>
    </template>
  </VPTeamPageSection>

  <!-- 售前售后分组 -->
  <VPTeamPageSection>
    <template #title>售前售后</template>
    <template #lead>为您提供专业的咨询与支持</template>
    <template #members>
      <VPTeamMembers size="medium" :members="supportMembers"></VPTeamMembers>
    </template>
  </VPTeamPageSection>
</VPTeamPage>

<style>
/* 强制 title 与 org 分行显示 */
.VPTeamMembersItem .affiliation {
  display: flex;
  flex-direction: column;
}
.VPTeamMembersItem .affiliation .at {
  display: none;
}
/* 可选：调整标题字体大小或间距 */
.VPTeamMembersItem .title {
  font-weight: 600;
  margin-bottom: 2px;
}
.VPTeamMembersItem .org {
  font-size: 0.9em;
  color: var(--vp-c-text-3);
}
</style>
