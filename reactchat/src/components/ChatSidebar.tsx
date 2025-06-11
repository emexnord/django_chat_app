import React from "react";
import {
import { PlusIcon, MessageSquareIcon, BotIcon } from "lucide-react";

Sidebar,
SidebarHeader,
SidebarContent,
SidebarFooter,
SidebarItem,
SidebarSection,
SidebarButton,
} from "@/components/ui/sidebar"; // Adjust import path as needed

const models = [
{ name: "GPT-4", icon: <BotIcon className="w-4 h-4 mr-2" /> },
{ name: "GPT-3.5", icon: <BotIcon className="w-4 h-4 mr-2" /> },
{ name: "Claude", icon: <BotIcon className="w-4 h-4 mr-2" /> },
];

const chatHistory = [
{ id: 1, title: "Chat with GPT-4" },
{ id: 2, title: "Claude brainstorming" },
{ id: 3, title: "GPT-3.5 Q&A" },
];

const ChatSidebar: React.FC = () => {
return (
    <Sidebar className="h-full w-72 border-r">
        <SidebarHeader>
            <div className="flex flex-col gap-2">
                <span className="text-lg font-semibold">Models</span>
                <div className="flex gap-2">
                    {models.map((model) => (
                        <SidebarButton
                            key={model.name}
                            variant="ghost"
                            className="flex items-center px-2 py-1"
                        >
                            {model.icon}
                            {model.name}
                        </SidebarButton>
                    ))}
                </div>
            </div>
        </SidebarHeader>
        
        <SidebarFooter>
            <span className="text-xs text-muted-foreground">© 2024 Chat App</span>
        </SidebarFooter>
    </Sidebar>
);
};
const ChatSidebarHistory: React.FC = () => (
    <SidebarSection>
        <span className="text-xs text-muted-foreground mb-2 block">
            History
        </span>
        <div className="flex flex-col gap-1">
            {chatHistory.map((chat) => (
                <SidebarItem key={chat.id} className="flex items-center">
                    <MessageSquareIcon className="w-4 h-4 mr-2" />
                    {chat.title}
                </SidebarItem>
            ))}
        </div>
    </SidebarSection>
);
export default ChatSidebar;