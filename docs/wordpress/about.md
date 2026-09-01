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

// ===== 核心开发者（2位） =====
const coreMembers: TeamMember[] = [
  {
    avatar: 'https://a1.boltp.com/2026/09/01/6a96b3ea73ecb.png',
    name: 'King',
    title: '启梦主题核心开发者',
    org: '创启网络',
    orgLink: 'https://qiimeng.com/',
    desc: '负责主题核心架构、功能开发与性能优化',
    links: [
      { icon: 'github', link: 'https://github.com/zhangqimeng' },
      { icon: 'bilibili', link: '' }
    ]
  },
  {
    avatar: 'https://a1.boltp.com/2026/09/01/6a96b3eb87522.png',
    name: '小满1221',
    title: '启梦主题核心开发者 & 网站运维工程师',
    org: '萌尚网络',
    desc: '负责主题架构、功能测试、性能优化与官网运行维护',
    links: [
      { icon: 'github', link: 'https://github.com/limengyuan' }
    ]
  }
]

// ===== 网站维护（2位） =====
const siteMembers: TeamMember[] = [
  {
    avatar: 'https://a1.boltp.com/2026/09/01/6a96b3ea8ea8b.png',
    name: '阿城',
    title: '文档编辑作者 & 网站运维工程师',
    org: '莫尔豪斯网络',
    desc: '负责文档维护、UI优化与内容更新',
    links: [
      { icon: 'github', link: 'https://github.com/wangxiaotian' }
    ]
  },
  {
    avatar: 'https://a1.boltp.com/2026/09/01/6a96b3ebeed9d.png',
    name: '水鱼AIE',
    title: '文档编辑作者',
    org: '莫尔豪斯网络',
    desc: '负责文档维护与内容更新',
    links: [
      { icon: 'github', link: 'https://github.com/zhaoxiaoya' }
    ]
  }
]

// ===== 售前售后（1位） =====
const supportMembers: TeamMember[] = [
  {
    avatar: 'https://a1.boltp.com/2026/09/01/6a96b3ec90f75.png',
    name: '断桥烟雨',
    title: '售前售后工程师',
    org: '千沐云网络',
    desc: '负责用户咨询、技术支持与售后服务',
    links: [
      { icon: 'github', link: 'https://github.com/liuxiaoshan' }
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
      <VPTeamMembers size="medium" :members="coreMembers" />
    </template>
  </VPTeamPageSection>

  <!-- 网站维护分组 -->
  <VPTeamPageSection>
    <template #title>网站维护</template>
    <template #lead>保障站点稳定与文档更新</template>
    <template #members>
      <VPTeamMembers size="medium" :members="siteMembers" />
    </template>
  </VPTeamPageSection>

  <!-- 售前售后分组 -->
  <VPTeamPageSection>
    <template #title>售前售后</template>
    <template #lead>为您提供专业的咨询与支持</template>
    <template #members>
      <VPTeamMembers size="medium" :members="supportMembers" />
    </template>
  </VPTeamPageSection>
</VPTeamPage>

<style>
/* 强制团队卡片纵向排列，使 title 和 org 分行 */
.VPMember {
  display: flex !important;
  flex-direction: column !important;
  align-items: flex-start !important;
}
/* 可选：调整标题字体大小或间距 */
.VPMember .title {
  font-weight: 600;
  margin-bottom: 2px;
}
.VPMember .org {
  font-size: 0.9em;
  color: var(--vp-c-text-3);
}
</style>