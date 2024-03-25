<template>
  <div id="resume">
    <div class="tech">
      <div>
        <h3>Core technologies</h3>
        <ul>
          <li v-for="tech in coreTechnologies">{{ tech }}</li>
        </ul>
      </div>
    </div>
    <div class="core">
      <section class="bio">
        <h1>Franklin Jezreel</h1>
        <h2>Software Engineer</h2>
        <p class="description">
          I do my best work as a hands-on technical leader and engineer where I
          can balance my time between solving important technical challenges
          with helping other members of my team grow in their respective roles.
        </p>
      </section>

      <section>
        <h2>Experience</h2>
        <p>
          I’ve garnered experience over the years in building medium to large
          scale solutions as an independent consultant and within organisations.
        </p>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
const coreTechnologies = ["typescript", "nodeJs", "Kubernetes"];

const experiences = [
  {
    company: "Wema Bank",
    jobTitle: "Senior Software Engineer",
    tenure: "December 2021 - Present",
    summary:
      "I lead a team of developers through the architecting, building, and maintenance of ALAT Loans Microservices.",
    highlights: [
      "Built a service for an on-demand spooling and analysis of customers’ bank statement to curb the risk associated with a manual vetting of (probable unauthentic) bank statements.",
      "Revamped the loan collections service to facilitate a proactive recovery of delinquent loans.",
      "Built fault tolerance into loans disbursement Microservice by leveraging upon message queues where we realised a 50% reduction in disbursement failure rate.",
    ],
  },
  {
    company: "Union Bank",
    jobTitle: "Software Engineer (contractor)",
    tenure: "June 2021 - December 2021",
    summary:
      "My work involved building business automation tools to streamline internal processes that are specific to insights in data and analytics.",
    highlights: [
      "Migrated ALERO from a legacy .NET Framework MVC project to independent frontend agnostic  modules exposed via APIs running on .NET Core.",
      "Introduced application containerization, continuous integration and delivery, leveraging upon Azure.",
    ],
  },
  {
    company: "Kiakia Prints",
    jobTitle: "Frontend Enginner",
    tenure: "June 2021 - December 2021",
    summary:
      "My work involved building business automation tools to streamline internal processes that are specific to insights in data and analytics.",
    highlights: [
      "Migrated ALERO from a legacy .NET Framework MVC project to independent frontend agnostic  modules exposed via APIs running on .NET Core.",
      "Introduced application containerization, continuous integration and delivery, leveraging upon Azure.",
    ],
  },
];
</script>

<style scoped>
#resume {
  display: grid;
  grid-template-columns: 1fr 4fr;
}
</style>
