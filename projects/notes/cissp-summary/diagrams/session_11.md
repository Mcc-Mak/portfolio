### Video V79: Virtualized Systems (Type 1 vs. Type 2 Hypervisors)

```mermaid
graph TD
    subgraph Virtualization Concepts
        VM[Virtual Machine - VM<br/>Software-created computer]
        Elasticity[Elasticity<br/>Dynamic allocation/de-allocation<br/>CPU, memory, storage]
        HV[Hypervisor / VMM<br/>Connects virtual to physical world]
    end

    subgraph Hypervisor Types
        subgraph Type1[Type 1 - Bare Metal]
            T1_HW[Physical Hardware]
            T1_HV[Hypervisor]
            T1_VM1[VM 1]
            T1_VM2[VM 2]
            T1_VM3[VM 3]
            T1_HW --> T1_HV
            T1_HV --> T1_VM1
            T1_HV --> T1_VM2
            T1_HV --> T1_VM3
        end

        subgraph Type2[Type 2 - Hosted]
            T2_HW[Physical Hardware]
            T2_OS[Host Operating System]
            T2_HV[Hypervisor - Application]
            T2_VM1[VM 1]
            T2_VM2[VM 2]
            T2_HW --> T2_OS
            T2_OS --> T2_HV
            T2_HV --> T2_VM1
            T2_HV --> T2_VM2
        end
    end

    subgraph Security Risks & Protections
        Risk1[Hardware Vulnerabilities<br/>Physical defects impact all VMs]
        Risk2[Hypervisor Vulnerabilities<br/>Unpatched = compromise all VMs]
        Risk3[VM Escape<br/>Bypass guest → interact with host]
        
        Protections[Protections:<br/>Host critical assets on physical<br/>Keep virtualization patched<br/>Monitor for malicious activity]
    end

    Type1 -.-> |Smaller attack surface| Protections
    Type2 -.-> |Larger attack surface| Risk3
    Risk1 --> Risk2 --> Risk3 --> Protections
```

---

### Video V80: Containerization (Docker, Kubernetes vs. VMs)

```mermaid
graph TD
    subgraph Containers vs Virtual Machines
        subgraph Containers
            C_HW[Hardware]
            C_HOST[Host OS]
            C_ENG[Container Engine]
            C_APP1[App 1 + deps]
            C_APP2[App 2 + deps]
            C_APP3[App 3 + deps]
            C_HW --> C_HOST
            C_HOST --> C_ENG
            C_ENG --> C_APP1
            C_ENG --> C_APP2
            C_ENG --> C_APP3
        end

        subgraph Virtual Machines
            V_HW[Hardware]
            V_HV[Hypervisor]
            V_G1[Guest OS 1]
            V_G2[Guest OS 2]
            V_G3[Guest OS 3]
            V_APP1[App 1]
            V_APP2[App 2]
            V_APP3[App 3]
            V_HW --> V_HV
            V_HV --> V_G1
            V_HV --> V_G2
            V_HV --> V_G3
            V_G1 --> V_APP1
            V_G2 --> V_APP2
            V_G3 --> V_APP3
        end
    end

    subgraph Security Risks & Best Practices
        Risks[Risks:<br/>App vulnerabilities, host OS attack surface<br/>Patching gaps, configuration drift<br/>Container breakout]
        BP[Best Practices:<br/>Group sensitive containers separately<br/>Use TPM for hardware protections<br/>Minimize host OS attack surface<br/>Strong access controls<br/>Encrypt registry keys & API connections<br/>Patch management]
    end

    C_ENG --> Docker[Docker]
    C_ENG --> K8s[Kubernetes - Orchestration]
    Risks --> BP
```

---

### Video V81: Cloud Deployment Models (Public, Private, Hybrid, Community)

```mermaid
graph TD
    subgraph Deployment Location
        OnPrem[On-Premise<br/>Hosted locally<br/>Organization maintains]
        OffPrem[Off-Premise<br/>Hosted by third party<br/>Vendor maintains: AWS, Azure, GCP]
    end

    subgraph Four Deployment Models
        Public[PUBLIC CLOUD<br/>Available to general public<br/>Large attack surface<br/>Data exposed to internet]
        
        Private[PRIVATE CLOUD<br/>Exclusive to single organization<br/>Contained risk<br/>Primary threats are internal]
        
        Community[COMMUNITY CLOUD<br/>Shared by 2+ organizations<br/>Mix of external + internal threats]
        
        Hybrid[HYBRID CLOUD<br/>Combination of models<br/>Public + Private typical<br/>Multiple attack vectors]
    end

    subgraph Security Considerations
        SC1[Data Privacy<br/>Governance, regulations, compliance]
        SC2[Attack Surface<br/>Public = internet threats<br/>Private = insider threats]
        SC3[Resources<br/>Patching, updates, dependencies]
        SC4[Capabilities<br/>Business & security requirements<br/>drive the decision]
    end

    OnPrem --> Private
    OffPrem --> Public
    Public --> SC1
    Private --> SC2
    Community --> SC3
    Hybrid --> SC4
```

---

### Video V82 & V83: Cloud Service Models (IaaS, PaaS, SaaS) + Shared Responsibility

```mermaid
graph LR
    subgraph Three Service Models
        IaaS[IaaS<br/>Infrastructure as a Service<br/>Customer: OS, apps, IAM, data<br/>Provider: Hardware, hypervisor, networking<br/>AWS EC2, Azure VMs]
        
        PaaS[PaaS<br/>Platform as a Service<br/>Customer: Apps, IAM, data<br/>Provider: Hardware, OS<br/>Development platforms]
        
        SaaS[SaaS<br/>Software as a Service<br/>Customer: Access controls, data<br/>Provider: Application → bare metal<br/>Office 365, training platform]
    end

    IaaS --> |Provider responsibility ↑<br/>Customer responsibility ↓| PaaS --> SaaS

    subgraph Shared Responsibility Model
        direction TB
        CSP[CSP: Security OF the cloud<br/>Infrastructure]
        Cust[Customer: Security IN the cloud<br/>Depends on services used]
    end

    subgraph SLA Types
        ServiceSLA[Service Level SLA<br/>Covers identical services<br/>Offered to multiple customers]
        CustomerSLA[Customer Level SLA<br/>Covers all services<br/>Used by single customer]
    end

    IaaS --> Cust
    PaaS --> Cust
    SaaS --> Cust
    CSP --> IaaS
    CSP --> PaaS
    CSP --> SaaS
    
    ServiceSLA --> SaaS
    CustomerSLA --> IaaS
```

---

### Video V84: Virtual Private Cloud (VPC)

```mermaid
graph TD
    subgraph VPC Definition
        VPC[VPC - Virtual Private Cloud<br/>Logically isolated virtual network<br/>Private cloud inside public cloud]
    end

    subgraph Key Benefits
        B1[Enhanced Security<br/>Isolate resources, control access]
        B2[Scalability & Flexibility<br/>Scale up/down, optimize cost]
        B3[Custom Networking<br/>Subnets, security groups<br/>Firewalls, custom IPs]
    end

    subgraph Connection Types
        DC[Direct Connect<br/>Dedicated high-speed circuit<br/>Data center → VPC]
        Peering[Peering<br/>Connect two VPCs<br/>Share same credentials]
        VPN[VPN Connection<br/>Secure tunnel over internet<br/>Via VPN gateway]
    end

    subgraph Internal Networking
        Subnets[Subnets<br/>Logical isolation, group resources<br/>Acts like packet filter]
        SG[Security Groups<br/>Virtual firewalls<br/>Instance-level traffic control]
        NACL[Network ACLs<br/>Subnet-level firewall<br/>Stateless filtering]
    end

    subgraph Best Practices
        BP1[Network segmentation]
        BP2[Least privilege - restrict by role]
        BP3[Encryption - at rest & in transit]
        BP4[Monitoring & logging<br/>CloudWatch, SIEM]
    end

    VPC --> B1 --> B2 --> B3
    B3 --> DC
    B3 --> Peering
    B3 --> VPN
    VPC --> Subnets
    Subnets --> SG
    SG --> NACL
    NACL --> BP1 --> BP2 --> BP3 --> BP4
```

---

### Video V85: Serverless Computing (Function-as-a-Service)

```mermaid
graph TD
    subgraph Definition
        FaaS[Serverless Computing / FaaS<br/>Function-as-a-Service<br/>On-demand computing resources<br/>Removes infrastructure management<br/>Responsibility shifts to CSP]
    end

    subgraph Benefits
        B1[Faster application development]
        B2[Cost-effective - pay per use]
    end

    subgraph Risks & Drawbacks
        R1[Increased Attack Surface<br/>Spans CSP infrastructure<br/>Larger than static deployments]
        R2[Control Gaps<br/>Traditional security tools<br/>may be ineffective]
        R3[Performance & Availability<br/>Cold starts and timeouts<br/>On infrequent use]
    end

    subgraph Mitigation Strategies
        M1[Define security responsibilities in SLA]
        M2[Minimize code<br/>Smaller code baselines<br/>Improve efficiency and control]
        M3[Limit sensitive data<br/>Ensure confidentiality & integrity<br/>in architecture]
    end

    FaaS --> B1
    FaaS --> B2
    B1 --> R1
    B2 --> R2
    R1 --> R3
    R2 --> R3
    R3 --> M1 --> M2 --> M3
```

---

### Bonus: Session 11 Complete Concept Map

```mermaid
mindmap
  root((Virtualization<br/>& Cloud Computing))
    Virtualized Systems
      Virtual Machine, Elasticity, Hypervisor
      Type 1: Bare metal - data centers
      Type 2: Hosted - testing, sandboxing
      Risks: VM Escape, hypervisor vulnerabilities
      Protections: Patch, monitor, physical for critical
    Containerization
      OS-level virtualization, lightweight
      Docker, Kubernetes orchestration
      vs VMs: shares host kernel, process isolation
      Risks: Breakout, host OS attack surface
      Best practices: TPM, isolation, access controls
    Cloud Deployment Models
      Public: internet-facing, large attack surface
      Private: single org, insider threats
      Community: shared by 2+ orgs
      Hybrid: combination, multiple vectors
    Cloud Service Models
      IaaS: Customer OS+apps, Provider hardware
      PaaS: Customer apps, Provider OS+hardware
      SaaS: Customer data, Provider everything else
      Responsibility shifts: IaaS → PaaS → SaaS
    Shared Responsibility
      CSP: Security OF the cloud
      Customer: Security IN the cloud
      SLA: Service Level vs Customer Level
    Virtual Private Cloud
      Isolated network in public cloud
      Subnets, Security Groups, NACLs
      Direct Connect, Peering, VPN
      Best practices: segmentation, least privilege, encryption
    Serverless Computing
      FaaS - on-demand pay per use
      Benefits: faster dev, cost-effective
      Risks: attack surface, control gaps, cold starts
      Mitigations: SLA, minimize code, limit sensitive data
```