import { NativeTabs } from "expo-router/native-tabs"

export default function TabsLayout() {
  return (
    <NativeTabs tintColor="#38bdf8">
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>
          Today
        </NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          md="today"
          sf={{
            default: "sun.max",
            selected: "sun.max.fill",
          }}
        />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="program">
        <NativeTabs.Trigger.Label>
          Program
        </NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          md="assignment"
          sf={{
            default: "list.bullet.clipboard",
            selected: "list.bullet.clipboard.fill",
          }}
        />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="progress">
        <NativeTabs.Trigger.Label>
          Progress
        </NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          md="show_chart"
          sf="chart.line.uptrend.xyaxis"
        />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="profile">
        <NativeTabs.Trigger.Label>
          Profile
        </NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          md="account_circle"
          sf={{
            default: "person.crop.circle",
            selected: "person.crop.circle.fill",
          }}
        />
      </NativeTabs.Trigger>
    </NativeTabs>
  )
}
