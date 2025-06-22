import AgentStatusGrid from "../components/agents/AgentStatusGrid";

const AgentsPage = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-white mb-4">Live Agent Console</h2>
        <AgentStatusGrid />
      </div>
    </div>
  );
};

export default AgentsPage; 