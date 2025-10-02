import { NextRequest, NextResponse } from "next/server";

const legalResponses = [
  {
    query: "What is Section 498A IPC?",
    response: `Section 498A of the Indian Penal Code (IPC) deals with cruelty by a husband or his relatives towards a married woman. This is a cognizable and non-bailable offense.

**Key Points:**
- Applies to cruelty by husband or his relatives
- Punishment: Imprisonment up to 3 years and fine
- Cruelty includes physical/mental harm or harassment for dowry demands

**Relevant Case Laws:**
1. *Arnesh Kumar v. State of Bihar (2014)* - Emphasized preventing misuse of Section 498A
2. *Rajesh Sharma v. State of UP (2017)* - Guidelines for arrest under this section

**Legal Implications:**
This provision aims to protect married women from harassment, but it's important to note that courts have also issued guidelines to prevent misuse.`,
  },
  {
    query: "Explain the concept of bail",
    response: `Bail is a legal process that allows an accused person to be released from custody while awaiting trial, subject to certain conditions.

**Types of Bail:**
1. **Regular Bail** - Under Section 437 CrPC (for non-bailable offenses)
2. **Anticipatory Bail** - Under Section 438 CrPC (before arrest)
3. **Interim Bail** - Temporary bail pending decision on regular bail

**Factors Considered:**
- Nature and gravity of the offense
- Likelihood of accused fleeing
- Risk of tampering with evidence
- Character and antecedents of accused

**Constitutional Provisions:**
Article 21 of the Constitution guarantees right to life and personal liberty, which has been interpreted to include the right to bail in appropriate cases.

**Landmark Judgments:**
- *Gudikanti Narasimhulu v. Public Prosecutor (1978)*
- *State of Rajasthan v. Balchand (1977)*`,
  },
];

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Find matching response or use generic one
    const matchedResponse = legalResponses.find((r) =>
      message.toLowerCase().includes(r.query.toLowerCase().split(" ")[2] || "")
    );

    const response = matchedResponse
      ? matchedResponse.response
      : `Based on Indian legal framework, here's what I found regarding "${message}":

This is a complex legal query that requires detailed analysis. In general, Indian law provides comprehensive frameworks covering:

**Constitutional Provisions:**
The Constitution of India provides fundamental rights and directive principles that guide all legal interpretations.

**Statutory Laws:**
Various acts like IPC, CrPC, CPC, and special laws govern different aspects of this matter.

**Judicial Precedents:**
Supreme Court and High Court judgments provide interpretative guidance on similar matters.

**Recommendations:**
1. Consult with a qualified legal professional for specific advice
2. Review relevant statutory provisions in detail
3. Examine recent case law for current judicial trends

*Note: This is a general overview. For specific legal advice, please consult a licensed attorney.*`;

    return NextResponse.json({
      success: true,
      response,
      timestamp: new Date().toISOString(),
      analysisMetadata: {
        documentsSearched: Math.floor(Math.random() * 500) + 100,
        relevancyScore: (Math.random() * 0.3 + 0.7).toFixed(2),
        processingTime: `${(Math.random() * 2 + 0.5).toFixed(2)}s`,
      },
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}