import type { AIBonusActivity } from "@/components/ai/AILessonCanvas";

export const FINANCE_INTERACTIVE_BY_LESSON: Record<string, AIBonusActivity[]> = {
  "fl-1": [
    {
      id: "fl1-parsons",
      kind: "parsons",
      title: "Goal-setting sequence",
      prompt:
        "Reorder the steps for turning a vague money wish into a goal you can actually hit.",
      languageLabel: "process",
      lines: [
        "Name what you want in specific, measurable terms",
        "Estimate a realistic total cost or target amount",
        "Set a deadline that matches your income reality",
        "Break the target into smaller weekly or monthly steps",
        "Track progress and adjust when life changes",
      ],
      lineExplanations: [
        "Specific language comes first because \"save more\" is too vague to plan against. Naming a clear outcome (for example, $400 for a used laptop) gives every later step something concrete to aim at.",
        "Estimating cost next turns the wish into a number you can schedule. If you pick a deadline before you know the total, you invent fake timelines that your paycheck cannot support.",
        "A deadline after the cost check forces honesty about how fast you can actually get there on your income. Skipping this step often produces goals that sound ambitious but quietly fail.",
        "Breaking the total into weekly or monthly amounts makes the goal actionable in real life. Without chunks, the big number feels endless and people quit before they start.",
        "Tracking and adjusting last keeps the plan alive when hours, prices, or priorities shift. A goal you never review becomes a forgotten promise, not a habit.",
      ],
      explanation:
        "Solid money goals are specific, costed, timed, broken into steps, and reviewed — not vague wishes.",
    },
    {
      id: "fl1-debug",
      kind: "debug",
      title: "Goal myth",
      prompt: "This TikTok-style advice sounds motivating but has a serious flaw. Spot it.",
      contentLabel: "Buggy tip",
      buggyContent:
        '"Just \"manifest\" a big lifestyle goal with no dollar amount or deadline. If you want it badly enough, the money will appear. Tracking progress is unnecessary because vibes beat planning."',
      choices: [
        "Goals need a clear amount, timeline, and tracking — wishing alone does not create cash",
        "Deadlines always kill motivation, so never set them",
        "Only people with full-time jobs can set money goals",
        "Tracking progress is only for people who already failed",
      ],
      correctIndex: 0,
      hint: "Can you schedule a goal that has no number and no date?",
      explanation:
        "Motivation helps, but money goals need measurable targets, timelines, and feedback. Wishing is not a funding plan.",
    },
    {
      id: "fl1-scenario",
      kind: "scenario",
      title: "Summer goal decision tree",
      startId: "start",
      nodes: [
        {
          id: "start",
          prompt:
            "Maya wants \"a better summer\" with money but has no clear target. She earns about $120/week from a part-time job. What first?",
          choices: [
            {
              id: "clarify",
              label: "Pick one specific goal with a dollar amount and date",
              nextId: "clarify-ok",
              tone: "best",
              feedback: "Clarity turns a vibe into something you can save toward.",
            },
            {
              id: "splurge",
              label: "Spend freely now and \"figure out goals later\"",
              nextId: "splurge-end",
              tone: "risky",
              feedback: "Delaying the target usually means the money never gets reserved.",
            },
            {
              id: "impossible",
              label: "Set a $5,000 goal for next month with no plan",
              nextId: "impossible-end",
              tone: "risky",
              feedback: "Unrealistic targets burn motivation fast.",
            },
          ],
        },
        {
          id: "clarify-ok",
          prompt:
            "She chooses $360 for a weekend trip in 12 weeks (~$30/week). Best next move?",
          choices: [
            {
              id: "automate",
              label: "Move $30 to savings each payday before discretionary spending",
              nextId: "success",
              tone: "best",
              feedback: "Pay-yourself-first makes the goal survive busy weeks.",
            },
            {
              id: "leftover",
              label: "Only save whatever is left after impulse buys",
              nextId: "leftover-end",
              tone: "risky",
              feedback: "\"Leftovers\" rarely equal a consistent $30.",
            },
          ],
        },
        {
          id: "success",
          ending: {
            title: "Goal on track",
            body: "You named a real target, matched it to income, and reserved money first. That is how teen goals actually happen.",
            isSuccess: true,
          },
          prompt: "Done.",
          choices: [],
        },
        {
          id: "splurge-end",
          ending: {
            title: "No target, no progress",
            body: "Without a specific goal, spending fills the space. Pick an amount and date, then reverse-engineer weekly saves.",
            isSuccess: false,
          },
          prompt: "Done.",
          choices: [],
        },
        {
          id: "impossible-end",
          ending: {
            title: "Unrealistic crash",
            body: "A goal that ignores income sets you up to quit. Resize the target or extend the timeline.",
            isSuccess: false,
          },
          prompt: "Done.",
          choices: [],
        },
        {
          id: "leftover-end",
          ending: {
            title: "Wishful leftovers",
            body: "Impulse spending eats the surplus first. Reserve the goal amount on payday, then spend what remains.",
            isSuccess: false,
          },
          prompt: "Done.",
          choices: [],
        },
      ],
    },
  ],

  "fl-2": [
    {
      id: "fl2-parsons",
      kind: "parsons",
      title: "Needs vs wants triage",
      prompt:
        "Reorder the steps for deciding what to buy when your money is tight this week.",
      languageLabel: "process",
      lines: [
        "List upcoming essential needs (food, transport, required fees)",
        "Total what those needs cost this week or month",
        "Compare the total to money you actually have available",
        "Fund needs first, then rank wants by value to you",
        "Choose which wants fit the leftover — skip or delay the rest",
      ],
      lineExplanations: [
        "Listing essentials first prevents \"I deserve this\" from crowding out stuff you cannot skip — like gas or a phone bill. If wants jump the queue, needs get funded with stress or debt.",
        "Totaling costs next turns a vague sense of \"I need stuff\" into a number. Without a sum, you cannot tell whether your cash covers the basics.",
        "Comparing to available money forces a reality check before shopping. Skipping this step is how people overspend and then scramble.",
        "Funding needs before ranking wants protects the basics. Ranking first often means the flashiest want wins while gas or lunch money disappears.",
        "Choosing only the wants that fit leftover cash teaches tradeoffs without guilt. Delaying the rest is not failure — it is budgeting with intention.",
      ],
      explanation:
        "Needs get funded first; wants compete for what remains. Tradeoffs are the skill, not willpower slogans.",
    },
    {
      id: "fl2-debug",
      kind: "debug",
      title: "Need/want mix-up",
      prompt: "Spot the flawed claim in this study note.",
      contentLabel: "Buggy note",
      buggyContent:
        '"If you really want something, it counts as a need. Needs and wants feel the same, so always buy both. Opportunity cost is only for businesses — not high schoolers."',
      choices: [
        "Wants are not needs; every purchase has an opportunity cost — even for teens",
        "Teens never face tradeoffs because parents pay everything",
        "Opportunity cost only applies to stocks",
        "Needs should always wait until wants are purchased",
      ],
      correctIndex: 0,
      hint: "What do you give up when you spend the same dollars elsewhere?",
      explanation:
        "Strong desire does not redefine a need. Choosing one purchase means those dollars cannot fund something else.",
    },
    {
      id: "fl2-scenario",
      kind: "scenario",
      title: "Tradeoff decision tree",
      startId: "start",
      nodes: [
        {
          id: "start",
          prompt:
            "Alex has $45 left until payday. A bus pass refill ($30) is due this week; friends want a $40 group dinner tonight. What first?",
          choices: [
            {
              id: "protect",
              label: "Protect the bus pass and pick a cheaper hangout option",
              nextId: "protect-ok",
              tone: "best",
              feedback: "Transport is a need that keeps school and work possible.",
            },
            {
              id: "dinner",
              label: "Join the full dinner and hope the bus situation works out",
              nextId: "dinner-end",
              tone: "risky",
              feedback: "Skipping a need for a want creates bigger costs later.",
            },
            {
              id: "borrow",
              label: "Buy both by borrowing from a friend with no repayment plan",
              nextId: "borrow-end",
              tone: "risky",
              feedback: "Unplanned borrowing turns one tradeoff into two problems.",
            },
          ],
        },
        {
          id: "protect-ok",
          prompt: "Friends push back. Best response that keeps the friendship and the budget?",
          choices: [
            {
              id: "honest",
              label: "Explain the budget limit and suggest free/cheap alternatives",
              nextId: "success",
              tone: "best",
              feedback: "Clear boundaries beat silent resentment or secret debt.",
            },
            {
              id: "secret",
              label: "Secretly skip the bus refill and go anyway so nobody knows",
              nextId: "secret-end",
              tone: "risky",
              feedback: "Hiding the tradeoff does not remove the consequence.",
            },
          ],
        },
        {
          id: "success",
          ending: {
            title: "Tradeoff handled",
            body: "You funded the need, named the limit, and still showed up socially in a cheaper way. That is real money judgment.",
            isSuccess: true,
          },
          prompt: "Done.",
          choices: [],
        },
        {
          id: "dinner-end",
          ending: {
            title: "Need deferred",
            body: "The dinner felt urgent; missing transport can cost shifts, grades, or emergency rides. Needs first is not boring — it is protective.",
            isSuccess: false,
          },
          prompt: "Done.",
          choices: [],
        },
        {
          id: "borrow-end",
          ending: {
            title: "Borrowed problem",
            body: "Borrowing without a repayment plan stacks social pressure on money stress. Shrink the want or wait for payday.",
            isSuccess: false,
          },
          prompt: "Done.",
          choices: [],
        },
        {
          id: "secret-end",
          ending: {
            title: "Hidden cost",
            body: "Secrecy does not refill the bus pass. Honest limits keep both friendships and mobility intact.",
            isSuccess: false,
          },
          prompt: "Done.",
          choices: [],
        },
      ],
    },
  ],

  "fl-3": [
    {
      id: "fl3-parsons",
      kind: "parsons",
      title: "Reading a paycheck",
      prompt:
        "Reorder the steps for making sense of your first paycheck — from gross to take-home.",
      languageLabel: "process",
      lines: [
        "Find gross pay (hours × rate, or salary for the period)",
        "Identify required deductions (taxes and mandated withholdings)",
        "Note optional deductions (benefits, other elections)",
        "Confirm net pay equals gross minus all deductions",
        "Compare net pay to your budget so plans use take-home, not gross",
      ],
      lineExplanations: [
        "Gross pay is the starting figure — what you earned before anything was taken out. If you skip it, you cannot tell whether hours or rate match what you expected.",
        "Required deductions come next because taxes and mandated withholdings are not optional. Understanding them prevents the shock of \"why is my check smaller?\"",
        "Optional deductions follow so you see choices you (or a guardian) elected, like benefits. Mixing them with taxes hides what you can actually change later.",
        "Confirming net pay checks the math: gross minus everything should equal what hits your account. Catching errors early beats discovering a shortfall after you already spent.",
        "Budgeting from net pay last keeps spending plans honest. Planning on gross almost always overestimates what you can safely use.",
      ],
      explanation:
        "Gross is earned; deductions reduce it; net is what you can actually budget. Always plan on take-home pay.",
    },
    {
      id: "fl3-debug",
      kind: "debug",
      title: "Paystub error",
      prompt: "This locker-room \"tip\" about paychecks is wrong. Spot the flaw.",
      contentLabel: "Buggy tip",
      buggyContent:
        '"Gross pay is what hits your debit card. Taxes on a teen paycheck are optional if you ask nicely. You can ignore withholdings because refunds always cover everything later."',
      choices: [
        "Net pay is what you receive; required tax withholdings are not optional; refunds are not a spending plan",
        "Only salaried adults have gross pay",
        "Debit cards create gross pay automatically",
        "Withholdings always mean you are being scammed",
      ],
      correctIndex: 0,
      hint: "Which number is \"take-home,\" and which taxes are required?",
      explanation:
        "Gross is before deductions. Required withholdings reduce your check now. A possible refund later is not permission to spend money you never received.",
    },
    {
      id: "fl3-scenario",
      kind: "scenario",
      title: "First paycheck decision tree",
      startId: "start",
      nodes: [
        {
          id: "start",
          prompt:
            "Jordan's first check is $186 net after seeing ~$240 gross. Friends say \"demand the missing money from your boss.\" What should Jordan do first?",
          choices: [
            {
              id: "read",
              label: "Read the paystub deductions line by line before reacting",
              nextId: "read-ok",
              tone: "best",
              feedback: "Most \"missing\" money is taxes or elected deductions, not theft.",
            },
            {
              id: "confront",
              label: "Accuse the manager of stealing without checking the stub",
              nextId: "confront-end",
              tone: "risky",
              feedback: "Skipping the stub can damage trust over a normal withholding.",
            },
            {
              id: "spend-gross",
              label: "Budget as if the full $240 is available to spend",
              nextId: "spend-end",
              tone: "risky",
              feedback: "You cannot spend dollars that were never deposited.",
            },
          ],
        },
        {
          id: "read-ok",
          prompt:
            "The stub shows expected tax withholdings and no obvious error. Best next step?",
          choices: [
            {
              id: "budget-net",
              label: "Update the spending plan using $186 net and ask your manager or payroll only if something looks wrong",
              nextId: "success",
              tone: "best",
              feedback: "Calm verification plus net-based planning is the smart move.",
            },
            {
              id: "ignore",
              label: "Ignore future stubs because \"taxes are someone else's problem\"",
              nextId: "ignore-end",
              tone: "risky",
              feedback: "Ongoing stub checks catch hour or rate mistakes early.",
            },
          ],
        },
        {
          id: "success",
          ending: {
            title: "Paycheck literate",
            body: "You verified deductions, avoided a false accusation, and budgeted take-home pay. That is paycheck fluency.",
            isSuccess: true,
          },
          prompt: "Done.",
          choices: [],
        },
        {
          id: "confront-end",
          ending: {
            title: "Premature confrontation",
            body: "Always read the stub first. If something still looks wrong after that, ask calmly with the document in hand.",
            isSuccess: false,
          },
          prompt: "Done.",
          choices: [],
        },
        {
          id: "spend-end",
          ending: {
            title: "Gross-pay trap",
            body: "Spending to gross overdraws your real cash. Net pay is the only number your budget can spend.",
            isSuccess: false,
          },
          prompt: "Done.",
          choices: [],
        },
        {
          id: "ignore-end",
          ending: {
            title: "Stub blindness",
            body: "Paystubs are your audit trail for hours, rate, and withholdings. Skimming them each pay period is part of having a job.",
            isSuccess: false,
          },
          prompt: "Done.",
          choices: [],
        },
      ],
    },
  ],

  "fl-4": [
    {
      id: "fl4-parsons",
      kind: "parsons",
      title: "Safe account setup",
      prompt:
        "Reorder the steps for opening and protecting your first bank account.",
      languageLabel: "process",
      lines: [
        "Compare account fees, minimums, and teen/student rules",
        "Open the account with required ID and any co-signer rules followed",
        "Turn on alerts for balances, debit use, and large changes",
        "Store login credentials securely and enable strong authentication",
        "Practice separating spending money from short-term savings",
      ],
      lineExplanations: [
        "Comparing fees and rules first prevents signing up for an account that quietly charges you. Teen and student products differ — reading before applying saves headaches.",
        "Opening with proper ID and co-signer requirements next keeps the account legitimate and usable. Skipping paperwork can freeze access when you need the money most.",
        "Alerts come early after opening so you notice mistakes, fraud, or overspending in near real time. Without alerts, small problems become big surprises.",
        "Securing logins and MFA protects the account once it holds real money. Weak passwords turn a helpful tool into an easy target.",
        "Separating spending from savings last builds a habit that debit cards alone do not create. One pile for \"use\" and one for \"not yet\" reduces accidental spend-downs.",
      ],
      explanation:
        "Shop fees first, open correctly, monitor with alerts, lock down access, then separate spend vs save.",
    },
    {
      id: "fl4-debug",
      kind: "debug",
      title: "Card confusion",
      prompt: "Find the incorrect claim about bank accounts and cards.",
      contentLabel: "Buggy claim",
      buggyContent:
        '"Debit cards are free loans from the bank. Credit cards and debit cards pull from the same \"borrow now, never repay\" bucket. Overdraft fees are rewards for shopping. Sharing your PIN with friends is fine if they pinky-promise."',
      choices: [
        "Debit spends your money; credit borrows; overdrafts cost you; never share PINs",
        "PINs are public by design",
        "Overdraft fees increase your credit score",
        "Credit cards never need repayment if you smile at the cashier",
      ],
      correctIndex: 0,
      hint: "Whose money moves first — yours or the lender's?",
      explanation:
        "Debit uses your balance. Credit is a loan you must repay. Overdrafts and shared PINs create costly, risky outcomes.",
    },
    {
      id: "fl4-match",
      kind: "match",
      title: "Banking match",
      prompt: "Match each banking idea to the best short definition.",
      pairs: [
        {
          id: "checking",
          left: "Checking account",
          right: "Everyday spending account linked to debit and transfers",
        },
        {
          id: "savings",
          left: "Savings account",
          right: "Separate place to hold money you do not plan to spend soon",
        },
        {
          id: "debit",
          left: "Debit card",
          right: "Pays from your own account balance",
        },
        {
          id: "credit",
          left: "Credit card",
          right: "Borrows the issuer's money that you must repay",
        },
      ],
    },
  ],

  "fl-5": [
    {
      id: "fl5-parsons",
      kind: "parsons",
      title: "Budget build order",
      prompt:
        "Reorder the steps for building a teen budget that can actually stick.",
      languageLabel: "process",
      lines: [
        "List net income for the period (what you truly receive)",
        "List fixed must-pay expenses and due dates",
        "Add variable essentials (food, transport, supplies)",
        "Assign money to goals and savings before fun spending",
        "Give remaining dollars a job (fun, buffer) and review weekly",
      ],
      lineExplanations: [
        "Net income first sets the ceiling for the whole plan. If you start with wish-list expenses, the budget invents money you do not have.",
        "Fixed must-pays next lock in obligations with clear due dates. That way nothing sneaks up mid-month. Skipping due dates is how late fees appear.",
        "Variable essentials after fixed costs cover real life that flexes week to week. Ignoring them makes the plan look fine on paper and fail in practice.",
        "Goals and savings before fun spending protect future-you when motivation dips. Fun-first budgets usually erase the goals by week two.",
        "Assigning leftovers and reviewing weekly keeps the budget alive. Unassigned money drifts; unreviewed plans go stale.",
      ],
      explanation:
        "Income → obligations → essentials → goals → fun, with a weekly review. Every dollar needs a job.",
    },
    {
      id: "fl5-debug",
      kind: "debug",
      title: "Budget myth",
      prompt: "This \"budget hack\" is broken. Spot why.",
      contentLabel: "Buggy hack",
      buggyContent:
        '"Budgets are only for people in debt. Use your gross pay as the limit. Never adjust mid-month — that means you failed. Fun money is irresponsible, so set it to $0."',
      choices: [
        "Budgets help anyone; use net pay; adjust when life changes; small fun money improves stickiness",
        "Only millionaires need budgets",
        "Gross pay is always safer than net pay for planning",
        "Changing a budget mid-month is illegal",
      ],
      correctIndex: 0,
      hint: "Is a budget a punishment — or a plan you update?",
      explanation:
        "A budget is a living plan based on take-home pay. Reasonable fun categories and adjustments make it sustainable.",
    },
    {
      id: "fl5-scenario",
      kind: "scenario",
      title: "Budget squeeze decision tree",
      startId: "start",
      nodes: [
        {
          id: "start",
          prompt:
            "Sam's monthly net from a part-time job is $400. Planned expenses + savings already total $420. What first?",
          choices: [
            {
              id: "rebalance",
              label: "Cut or delay lower-priority wants until the plan fits $400",
              nextId: "rebalance-ok",
              tone: "best",
              feedback: "Budgets must fit real income — not the other way around.",
            },
            {
              id: "ignore",
              label: "Keep all spending and hope tips or gifts cover the gap",
              nextId: "ignore-end",
              tone: "risky",
              feedback: "Hope is not a funding source you can schedule.",
            },
            {
              id: "hide",
              label: "Hide a $20 \"mystery\" expense so the numbers look balanced",
              nextId: "hide-end",
              tone: "risky",
              feedback: "Fake balance breaks trust with yourself.",
            },
          ],
        },
        {
          id: "rebalance-ok",
          prompt: "After cuts, $25 remains unassigned. Best use?",
          choices: [
            {
              id: "jobs",
              label: "Split it: small buffer + small fun so the plan is realistic",
              nextId: "success",
              tone: "best",
              feedback: "Buffers and modest fun keep budgets from snapping.",
            },
            {
              id: "zero",
              label: "Leave it unlabeled and spend randomly when bored",
              nextId: "zero-end",
              tone: "risky",
              feedback: "Unlabeled dollars tend to vanish without progress.",
            },
          ],
        },
        {
          id: "success",
          ending: {
            title: "Budget that fits",
            body: "You resized spending to income and gave leftovers clear jobs. That is how budgets survive real months.",
            isSuccess: true,
          },
          prompt: "Done.",
          choices: [],
        },
        {
          id: "ignore-end",
          ending: {
            title: "Gap ignored",
            body: "A plan that needs mystery money fails under pressure. Cut wants or raise income on purpose — do not assume.",
            isSuccess: false,
          },
          prompt: "Done.",
          choices: [],
        },
        {
          id: "hide-end",
          ending: {
            title: "Fake balance",
            body: "Honest numbers beat pretty spreadsheets. Name every cost, then negotiate with reality.",
            isSuccess: false,
          },
          prompt: "Done.",
          choices: [],
        },
        {
          id: "zero-end",
          ending: {
            title: "Drift spending",
            body: "Give every dollar a job — even \"fun\" or \"buffer.\" Random leftover spending recreates the squeeze.",
            isSuccess: false,
          },
          prompt: "Done.",
          choices: [],
        },
      ],
    },
  ],

  "fl-6": [
    {
      id: "fl6-parsons",
      kind: "parsons",
      title: "Track then protect",
      prompt:
        "Reorder the steps for tracking spending and starting a small emergency fund.",
      languageLabel: "process",
      lines: [
        "Record spending for a couple of weeks without judgment",
        "Sort expenses into categories and spot leaks",
        "Set a starter emergency-fund target you can reach",
        "Automate or schedule small transfers toward that fund",
        "Use the fund only for true emergencies, then refill",
      ],
      lineExplanations: [
        "Recording first creates data instead of guesses. Judging yourself mid-week often stops the tracking before patterns appear.",
        "Sorting into categories next reveals leaks — subscriptions, snacks, impulse apps — you can actually change. Without categories, totals feel mysterious.",
        "A reachable starter target (even $100–$500) beats an intimidating \"3–6 months\" speech for beginners. Impossible targets delay starting.",
        "Scheduling transfers turns intention into deposits. Waiting for leftover motivation usually means the fund never grows.",
        "Restricting use to true emergencies preserves the point of the fund. Raiding it for wants recreates the crisis you meant to avoid — so refill after any real use.",
      ],
      explanation:
        "Track honestly, find leaks, set a starter emergency target, automate deposits, and protect the fund for real emergencies.",
    },
    {
      id: "fl6-debug",
      kind: "debug",
      title: "Emergency-fund myth",
      prompt: "Spot the dangerous idea in this tip.",
      contentLabel: "Buggy tip",
      buggyContent:
        '"Emergency funds are only for adults with houses. Tracking spending is creepy. If you need cash fast, a high-interest payday loan is basically the same as savings."',
      choices: [
        "Teens benefit from tracking and a starter emergency fund; payday-style debt is not a substitute for savings",
        "Only homeowners can have unexpected expenses",
        "Tracking spending always lowers your credit score",
        "Emergency funds must be invested in meme stocks",
      ],
      correctIndex: 0,
      hint: "What is cheaper — money you already saved, or money you borrow in a panic?",
      explanation:
        "Small cash buffers reduce panic borrowing. Tracking shows where the buffer can come from.",
    },
    {
      id: "fl6-scenario",
      kind: "scenario",
      title: "Emergency vs urge decision tree",
      startId: "start",
      nodes: [
        {
          id: "start",
          prompt:
            "Riley has $180 in a labeled emergency fund. Phone charger dies; a limited-drop hoodie goes on sale tonight. What counts as the emergency?",
          choices: [
            {
              id: "charger",
              label: "Replace the charger from regular spending; leave the fund alone",
              nextId: "charger-ok",
              tone: "best",
              feedback: "Predictable replacements are budget items, not emergencies.",
            },
            {
              id: "hoodie",
              label: "Use emergency cash for the hoodie because FOMO feels urgent",
              nextId: "hoodie-end",
              tone: "risky",
              feedback: "Urgency marketing is not an emergency.",
            },
            {
              id: "both",
              label: "Drain the fund for both and \"refill someday\"",
              nextId: "both-end",
              tone: "risky",
              feedback: "Empty buffers leave you exposed to real surprises.",
            },
          ],
        },
        {
          id: "charger-ok",
          prompt:
            "Two weeks later, Riley's bike lock is stolen and they need a ride-share to work tonight. Best move?",
          choices: [
            {
              id: "use-fund",
              label: "Use a small amount of emergency funds for the true disruption, then plan a refill",
              nextId: "success",
              tone: "best",
              feedback: "That is what the fund is for — then rebuild it.",
            },
            {
              id: "skip-work",
              label: "Skip work unpaid rather than touch savings under any circumstance",
              nextId: "skip-end",
              tone: "risky",
              feedback: "Protecting a number while losing income misses the point.",
            },
          ],
        },
        {
          id: "success",
          ending: {
            title: "Fund used wisely",
            body: "You kept wants out of the emergency jar, used it for a real disruption, and planned to refill. That is how you handle a starter emergency fund.",
            isSuccess: true,
          },
          prompt: "Done.",
          choices: [],
        },
        {
          id: "hoodie-end",
          ending: {
            title: "FOMO withdrawal",
            body: "Sales create fake emergencies. Keep the fund for surprises that threaten safety, work, or required obligations.",
            isSuccess: false,
          },
          prompt: "Done.",
          choices: [],
        },
        {
          id: "both-end",
          ending: {
            title: "Buffer gone",
            body: "Draining the fund for non-emergencies leaves you one flat tire from a worse decision. Separate wants from reserves.",
            isSuccess: false,
          },
          prompt: "Done.",
          choices: [],
        },
        {
          id: "skip-end",
          ending: {
            title: "Wrong tradeoff",
            body: "Emergency funds exist so a short disruption does not become lost income. Use carefully, then refill.",
            isSuccess: false,
          },
          prompt: "Done.",
          choices: [],
        },
      ],
    },
  ],

  "fl-7": [
    {
      id: "fl7-parsons",
      kind: "parsons",
      title: "Credit health habits",
      prompt:
        "Reorder the habits that support healthier credit over time (when you use credit responsibly).",
      languageLabel: "process",
      lines: [
        "Understand that credit history reflects payment and balance behavior over time",
        "Pay at least the amount due on time, every time",
        "Keep revolving balances low relative to limits when possible",
        "Avoid opening many new accounts in a short window without need",
        "Review reports for errors and dispute mistakes through official channels",
      ],
      lineExplanations: [
        "Understanding what credit measures comes first so habits have a purpose. Credit is a track record, not a mystery score lottery.",
        "On-time payments are the foundation because late payments can hurt for years. Nothing else reliably \"cancels\" a pattern of missed dues.",
        "Keeping balances low relative to limits next reduces utilization stress on many scoring models. Maxing cards to look \"active\" often backfires.",
        "Spacing new accounts matters because each application can add inquiries and new risk. Opening many cards for rewards without need can look unstable.",
        "Reviewing reports last in this cycle catches identity errors or outdated negatives. Official disputes beat ignoring a wrong mark that keeps costing you.",
      ],
      explanation:
        "Credit rewards boring reliability: on-time payments, moderate utilization, limited unnecessary applications, and clean reports.",
    },
    {
      id: "fl7-debug",
      kind: "debug",
      title: "Credit myth",
      prompt: "Find the false claim about credit.",
      contentLabel: "Buggy claim",
      buggyContent:
        '"Carrying a big balance forever is required to build credit. Closing every account after one purchase always helps. Credit scores are secret and teens can never see any credit information. Paying late occasionally is fine if you pay extra later."',
      choices: [
        "You do not need high ongoing balances; late payments hurt; responsible use and checking reports matter",
        "Credit scores only exist for celebrities",
        "Paying late is the fastest way to improve credit",
        "Utilization should always stay at 100%",
      ],
      correctIndex: 0,
      hint: "What do lenders care about more — drama balances or on-time reliability?",
      explanation:
        "On-time payments and manageable balances matter far more than carrying unnecessary debt. Review your information through legitimate channels.",
    },
    {
      id: "fl7-scenario",
      kind: "scenario",
      title: "First credit decision tree",
      startId: "start",
      nodes: [
        {
          id: "start",
          prompt:
            "Taylor gets a starter credit card with a $300 limit. Friends say \"max it out so the bank sees activity.\" What first?",
          choices: [
            {
              id: "plan",
              label: "Use it only for planned small purchases you can pay in full",
              nextId: "plan-ok",
              tone: "best",
              feedback: "Credit is a tool — not a dare to max the limit.",
            },
            {
              id: "max",
              label: "Max it immediately for status and \"score building\"",
              nextId: "max-end",
              tone: "risky",
              feedback: "High utilization plus possible interest is a rough start.",
            },
            {
              id: "cash",
              label: "Take cash advances for weekend fun",
              nextId: "cash-end",
              tone: "risky",
              feedback: "Cash advances are often costly and easy to mismanage.",
            },
          ],
        },
        {
          id: "plan-ok",
          prompt: "A $40 charge posts. Best follow-through?",
          choices: [
            {
              id: "payfull",
              label: "Pay in full before the due date and turn on payment reminders",
              nextId: "success",
              tone: "best",
              feedback: "Full on-time payment avoids interest and builds a clean history.",
            },
            {
              id: "minimum",
              label: "Pay only the minimum forever so the balance \"stays active\"",
              nextId: "minimum-end",
              tone: "risky",
              feedback: "Minimums keep you in interest longer than you need.",
            },
          ],
        },
        {
          id: "success",
          ending: {
            title: "Credit used carefully",
            body: "Small planned charges, paid in full and on time, beat maxing a card for myths. That is how credit history should start.",
            isSuccess: true,
          },
          prompt: "Done.",
          choices: [],
        },
        {
          id: "max-end",
          ending: {
            title: "Utilization trap",
            body: "Maxing a limit does not magically build elite credit. It raises balances you must repay — often with interest.",
            isSuccess: false,
          },
          prompt: "Done.",
          choices: [],
        },
        {
          id: "cash-end",
          ending: {
            title: "Costly advance",
            body: "Cash advances can add fees and interest quickly. Stick to planned purchases you can repay.",
            isSuccess: false,
          },
          prompt: "Done.",
          choices: [],
        },
        {
          id: "minimum-end",
          ending: {
            title: "Minimum habit",
            body: "Minimum payments keep debt alive. When you can, pay in full and treat interest as a warning light.",
            isSuccess: false,
          },
          prompt: "Done.",
          choices: [],
        },
      ],
    },
  ],

  "fl-8": [
    {
      id: "fl8-parsons",
      kind: "parsons",
      title: "Debt decision sequence",
      prompt:
        "Reorder the steps you should take before taking on a loan or carrying card debt.",
      languageLabel: "process",
      lines: [
        "Confirm the purchase or need is necessary and sized to your income",
        "Compare APR, fees, and total cost — not just the monthly payment",
        "Check whether you can afford payments if income dips",
        "Choose the lowest-total-cost responsible option available",
        "Set a payoff plan with dates before you borrow",
      ],
      lineExplanations: [
        "Necessity and fit come first because debt for a want you cannot afford is how traps start. If the need is optional, waiting may be cheaper than interest.",
        "Comparing APR, fees, and total cost next reveals the real price of borrowing. Monthly payment alone can hide long, expensive terms.",
        "Stress-testing payments against a smaller paycheck comes next. It protects you from barely affordable loans. Those deals break under normal life noise.",
        "Choosing the lowest responsible total cost after comparison beats flashy offers. Marketing headlines are not your amortization schedule.",
        "A written payoff plan before borrowing keeps the debt temporary. Borrowing without an exit timeline is how balances linger for years.",
      ],
      explanation:
        "Borrow only for needs you can repay. Compare total cost, stress-test payments, and plan the payoff before you sign.",
    },
    {
      id: "fl8-debug",
      kind: "debug",
      title: "Interest trap myth",
      prompt: "Spot the false claim about debt and interest.",
      contentLabel: "Buggy claim",
      buggyContent:
        '"If the monthly payment is low, the loan is automatically cheap. Interest only matters for big adult loans. Buy-now-pay-later never has costs or risks. Making minimum credit payments is the fastest way out of debt."',
      choices: [
        "Low payments can mean long costly terms; interest matters; BNPL has risks; minimums slow payoff",
        "Interest is illegal for people under 18 in all cases",
        "Longer loans always cost less overall",
        "Minimum payments erase interest by law",
      ],
      correctIndex: 0,
      hint: "What happens to total cost when you stretch payments out?",
      explanation:
        "Monthly payment marketing can hide total interest. Understand APR, fees, and payoff speed before you borrow.",
    },
    {
      id: "fl8-order",
      kind: "order",
      title: "Payoff priority order",
      prompt:
        "Put these debt-response steps in a sensible order when balances feel stressful.",
      items: [
        { id: "list", label: "List every debt with balance, rate, and minimum due" },
        { id: "essentials", label: "Cover essentials and required minimums to stay current" },
        { id: "target", label: "Put extra money toward the highest-rate or chosen focus debt" },
        { id: "cut", label: "Cut nonessential spending that feeds new balances" },
        { id: "review", label: "Review progress monthly and avoid new high-cost debt" },
      ],
      itemExplanations: [
        "Listing debts first creates a full map of what you owe. Without rates and minimums visible, \"extra\" payments are guesses.",
        "Covering essentials and required minimums next prevents new late fees and damage while you attack the plan. Skipping minimums to \"focus\" can make everything worse.",
        "Directing extras to a focus debt (often highest rate) after you are current accelerates progress. Random tiny payments everywhere feel busy but move slowly.",
        "Cutting spend that creates new balances protects the plan from sabotage. Paying down while still charging wants is a treadmill.",
        "Monthly review last keeps momentum and blocks \"just this once\" new high-cost borrowing. Plans fail quietly without check-ins.",
      ],
    },
  ],

  "fl-9": [
    {
      id: "fl9-parsons",
      kind: "parsons",
      title: "Saving & compound path",
      prompt:
        "Reorder a practical path for building savings from a part-time job that can grow over time.",
      languageLabel: "process",
      lines: [
        "Set a clear savings purpose and starter target",
        "Open or designate a separate savings place away from daily spend",
        "Automate small, regular deposits you can sustain",
        "Leave the money invested in time so growth can compound",
        "Increase deposits when income rises instead of only increasing lifestyle",
      ],
      lineExplanations: [
        "Purpose and target first make saving feel concrete. Vague \"I should save\" rarely survives payday temptation.",
        "A separate savings spot next reduces accidental spending. Money sitting in checking often looks spendable.",
        "Automation turns good intentions into recurring deposits. Relying on leftover willpower usually underfunds the goal.",
        "Leaving money alone for time is what lets compound growth matter. Constant withdrawals reset the clock on growth.",
        "Raising deposits when income grows prevents lifestyle creep from eating every raise. Future-you benefits from the upgrade too.",
      ],
      explanation:
        "Purpose, separation, automation, time, and raise-your-savings beats hoping leftovers compound.",
    },
    {
      id: "fl9-debug",
      kind: "debug",
      title: "Compound myth",
      prompt: "Find the wrong idea about saving and compound growth.",
      contentLabel: "Buggy idea",
      buggyContent:
        '"Compound growth means you get rich this weekend with one deposit. Timing the market daily beats steady contributions. Withdrawals never affect growth. Only people with thousands should bother starting."',
      choices: [
        "Compounding needs time and consistency; small starts matter; withdrawals interrupt growth",
        "Compound interest is a myth taught to trick teens",
        "One deposit always doubles overnight by law",
        "Automation makes saving illegal",
      ],
      correctIndex: 0,
      hint: "What does \"compound\" need that a weekend cannot provide?",
      explanation:
        "Compound growth rewards time and repeated contributions. Starting small and staying consistent beats get-rich-quick fantasies.",
    },
    {
      id: "fl9-scenario",
      kind: "scenario",
      title: "Save vs spend decision tree",
      startId: "start",
      nodes: [
        {
          id: "start",
          prompt:
            "Casey can auto-transfer $20 per paycheck to savings or keep buying $20 impulse snacks. Goal: $300 for senior prom tickets and outfit in 8 months. What first?",
          choices: [
            {
              id: "auto",
              label: "Turn on the $20 transfer and treat snacks as a smaller leftover category",
              nextId: "auto-ok",
              tone: "best",
              feedback: "Automation protects the goal before temptation spends it.",
            },
            {
              id: "impulse",
              label: "Skip saving because \"I deserve treats after every shift\"",
              nextId: "impulse-end",
              tone: "risky",
              feedback: "Unlimited treats crowd out timed goals.",
            },
            {
              id: "lottery",
              label: "Put the $20 into lottery tickets to \"speed up\" the headphones",
              nextId: "lottery-end",
              tone: "risky",
              feedback: "Gambling is not a savings strategy.",
            },
          ],
        },
        {
          id: "auto-ok",
          prompt: "At month 3, friends pressure Casey to pause savings for a spring break trip. Best move?",
          choices: [
            {
              id: "adjust",
              label: "Keep a smaller auto-save and budget the trip from leftover fun money",
              nextId: "success",
              tone: "best",
              feedback: "Reducing beats stopping — consistency compounds.",
            },
            {
              id: "drain",
              label: "Drain all savings for the trip and restart \"later\"",
              nextId: "drain-end",
              tone: "risky",
              feedback: "Full resets erase months of progress.",
            },
          ],
        },
        {
          id: "success",
          ending: {
            title: "Consistency wins",
            body: "You automated deposits, kept a smaller save during pressure, and funded fun from leftovers. That is how compound habits form.",
            isSuccess: true,
          },
          prompt: "Done.",
          choices: [],
        },
        {
          id: "impulse-end",
          ending: {
            title: "Goal crowded out",
            body: "Treats can exist in a budget — but not as an unlimited category that cancels timed goals.",
            isSuccess: false,
          },
          prompt: "Done.",
          choices: [],
        },
        {
          id: "lottery-end",
          ending: {
            title: "Not compounding",
            body: "Lottery tickets are spending with long odds, not a growth plan. Steady deposits beat jackpot daydreams.",
            isSuccess: false,
          },
          prompt: "Done.",
          choices: [],
        },
        {
          id: "drain-end",
          ending: {
            title: "Reset tax",
            body: "Emptying the account for a want restarts the timeline. Adjust the rate; do not erase the habit.",
            isSuccess: false,
          },
          prompt: "Done.",
          choices: [],
        },
      ],
    },
  ],

  "fl-10": [
    {
      id: "fl10-parsons",
      kind: "parsons",
      title: "Investing readiness order",
      prompt:
        "Reorder a cautious sequence before putting money into investments.",
      languageLabel: "process",
      lines: [
        "Cover near-term needs and a basic emergency buffer first",
        "Learn the difference between saving and investing risk",
        "Define a long time horizon and a goal that can tolerate ups and downs",
        "Choose diversified, understandable options — avoid hype tips",
        "Invest only money you will not need soon; review periodically",
      ],
      lineExplanations: [
        "Buffers and near-term needs come first so you are not forced to sell investments in a downturn to buy groceries. Investing without a cushion turns volatility into a crisis.",
        "Learning risk differences next prevents treating stocks like a savings account. If you skip this, market drops feel like personal failure instead of expected noise.",
        "A long horizon and suitable goal must exist before you buy. Short-term money in volatile assets is how people lock in losses.",
        "Diversified, understandable choices beat hype because concentration and \"hot tips\" amplify downside. If you cannot explain it simply, pause.",
        "Using only patient money and reviewing periodically keeps the plan honest. Checking constantly to day-trade or chasing trends usually hurts beginners.",
      ],
      explanation:
        "Invest after basics are covered, with time, diversification, and money you can leave invested — not on hype.",
    },
    {
      id: "fl10-debug",
      kind: "debug",
      title: "Risk myth",
      prompt: "Spot the false investing claim.",
      contentLabel: "Buggy claim",
      buggyContent:
        '"High returns with zero risk are common if you follow social media tips. Past performance guarantees future results. Diversification is for scared people. Borrow money to invest when a tip feels certain."',
      choices: [
        "Higher return usually means higher risk; past ≠ future; diversification manages risk; do not borrow to chase tips",
        "Zero-risk high returns are standard for beginners",
        "Borrowing always improves investing outcomes",
        "Diversification is illegal for teens",
      ],
      correctIndex: 0,
      hint: "If someone promises huge returns with no risk, what should you assume?",
      explanation:
        "Risk and return travel together. Diversify, ignore guarantees, and never borrow for speculative tips.",
    },
    {
      id: "fl10-scenario",
      kind: "scenario",
      title: "Investing pressure decision tree",
      startId: "start",
      nodes: [
        {
          id: "start",
          prompt:
            "A classmate says a meme asset will \"10× by Friday\" and urges Priya to put her $200 emergency fund (phone repair + bus pass money) into it. What first?",
          choices: [
            {
              id: "pause",
              label: "Keep the emergency fund intact and refuse FOMO investing",
              nextId: "pause-ok",
              tone: "best",
              feedback: "Emergency money is for shocks, not speculative bets.",
            },
            {
              id: "allin",
              label: "Invest all $200 because missing out feels worse",
              nextId: "allin-end",
              tone: "risky",
              feedback: "FOMO is not a research process.",
            },
            {
              id: "borrow",
              label: "Borrow extra to buy more and \"get rich faster\"",
              nextId: "borrow-end",
              tone: "risky",
              feedback: "Borrowed speculation can leave you with debt and losses.",
            },
          ],
        },
        {
          id: "pause-ok",
          prompt:
            "Priya later has $50 of true long-term \"can leave alone\" money and wants to learn. Best next step?",
          choices: [
            {
              id: "learn",
              label: "Learn basics, consider diversified low-cost options, invest only what she can leave invested",
              nextId: "success",
              tone: "best",
              feedback: "Education + patient money + diversification is the learner path.",
            },
            {
              id: "tip",
              label: "Buy whatever the same classmate hypes without reading anything",
              nextId: "tip-end",
              tone: "risky",
              feedback: "Outsourcing judgment to hype is not investing literacy.",
            },
          ],
        },
        {
          id: "success",
          ending: {
            title: "Patient investor habits",
            body: "You protected emergency cash, ignored get-rich-quick pressure, and approached investing as a long-term, diversified skill.",
            isSuccess: true,
          },
          prompt: "Done.",
          choices: [],
        },
        {
          id: "allin-end",
          ending: {
            title: "Buffer gambled",
            body: "Turning emergency savings into a speculative bet can leave you broke when a real bill hits. Separate buffers from investments.",
            isSuccess: false,
          },
          prompt: "Done.",
          choices: [],
        },
        {
          id: "borrow-end",
          ending: {
            title: "Leverage trap",
            body: "Borrowing to chase tips stacks interest risk on market risk. That is how small mistakes become large ones.",
            isSuccess: false,
          },
          prompt: "Done.",
          choices: [],
        },
        {
          id: "tip-end",
          ending: {
            title: "Hype follower",
            body: "If you cannot explain an investment in plain language, you are not ready to buy it. Learn first.",
            isSuccess: false,
          },
          prompt: "Done.",
          choices: [],
        },
      ],
    },
  ],

  "fl-11": [
    {
      id: "fl11-parsons",
      kind: "parsons",
      title: "Insurance decision path",
      prompt:
        "Reorder how to think about insurance before you drive, move out, or skip coverage.",
      languageLabel: "process",
      lines: [
        "Identify risks that would be financially devastating if they happened",
        "Check what coverage you already have (family, school, job, law)",
        "Compare premiums, deductibles, and what is actually covered",
        "Choose coverage that transfers the big risks you cannot afford alone",
        "Store policy contacts and review coverage when life changes",
      ],
      lineExplanations: [
        "Starting with catastrophic risks focuses insurance on its real job: protecting you from ruin, not from every inconvenience. If you insure tiny stuff first, you may underinsure the disasters.",
        "Checking existing coverage next avoids paying twice for the same protection. Many teens already have some coverage through family or required policies.",
        "Comparing premium, deductible, and covered events reveals the true tradeoff. A cheap policy that excludes what you need is not a bargain.",
        "Choosing coverage for risks you cannot self-fund puts the product in the right role. Insurance is not a savings account or investment scheme.",
        "Storing contacts and reviewing after life changes keeps help reachable. Policies left unread fail when you need them most.",
      ],
      explanation:
        "Insure catastrophic risks you cannot afford, after checking existing coverage and comparing real policy terms.",
    },
    {
      id: "fl11-debug",
      kind: "debug",
      title: "Insurance myth",
      prompt: "Find the incorrect insurance statement.",
      contentLabel: "Buggy statement",
      buggyContent:
        '"Insurance is a way to get rich if nothing bad happens. Deductibles never matter. If a risk is unlikely, you never need coverage even if the loss would wipe you out. You should memorize every clause instead of knowing how to contact your insurer."',
      choices: [
        "Insurance transfers big financial risks; deductibles matter; rare but ruinous risks still count; know how to file a claim",
        "Premiums are lottery tickets with guaranteed jackpots",
        "Deductibles are always $0 by federal law",
        "Only impossible risks are worth insuring",
      ],
      correctIndex: 0,
      hint: "Is insurance designed to make a profit for you when nothing happens?",
      explanation:
        "You pay premiums for protection against large losses. Deductibles, exclusions, and claim processes matter as much as the monthly price.",
    },
    {
      id: "fl11-match",
      kind: "match",
      title: "Coverage match",
      prompt: "Match each insurance idea to the best short definition.",
      pairs: [
        {
          id: "premium",
          left: "Premium",
          right: "What you pay to keep coverage active",
        },
        {
          id: "deductible",
          left: "Deductible",
          right: "What you pay out of pocket before coverage kicks in",
        },
        {
          id: "liability",
          left: "Liability coverage",
          right: "Helps cover costs if you cause damage or injury to others",
        },
        {
          id: "risk-transfer",
          left: "Risk transfer",
          right: "Shifting financial impact of big losses to an insurer",
        },
      ],
    },
  ],

  "fl-12": [
    {
      id: "fl12-parsons",
      kind: "parsons",
      title: "Scam response order",
      prompt:
        "Reorder a safe response when a message or deal feels like a consumer scam.",
      languageLabel: "process",
      lines: [
        "Pause — do not send money, codes, or personal data immediately",
        "Separate the claim from urgency pressure (\"act now or else\")",
        "Verify through official channels you look up yourself",
        "Report the attempt to a parent/guardian, school, bank, or FTC resources as appropriate",
        "Update passwords or freeze cards if you already shared sensitive info",
      ],
      lineExplanations: [
        "Pausing first stops the scam's favorite weapon: panic. If you send codes or money in the first minute, verification comes too late.",
        "Naming urgency pressure next helps you see manipulation. Real organizations rarely demand secrecy and instant payment by gift card or crypto.",
        "Verifying through channels you look up yourself breaks spoofed links and caller ID tricks. Using contact info from the message often reconnects you to the scammer.",
        "Reporting after verification protects others and creates a record. Silence lets the same lure hit classmates and family.",
        "Credential and card cleanup last limits damage if something already leaked. Skipping this step after a mistake leaves accounts open.",
      ],
      explanation:
        "Pause, resist urgency, verify independently, report, and secure accounts if needed. Speed is the scammer's ally.",
    },
    {
      id: "fl12-debug",
      kind: "debug",
      title: "Consumer myth",
      prompt: "Spot the dangerous consumer claim.",
      contentLabel: "Buggy claim",
      buggyContent:
        '"If a caller already knows your name, they must be your bank. Gift cards are a normal way to pay the IRS. Sharing a one-time code is safe because it expires. Refunds are impossible once you click anything."',
      choices: [
        "Name knowledge ≠ legitimacy; government will not demand gift cards; codes are secrets; report and seek help quickly",
        "Gift cards are the official tax currency",
        "One-time codes should be posted publicly",
        "Banks always ask you to pay fees with crypto",
      ],
      correctIndex: 0,
      hint: "How do real banks and agencies ask you to verify identity?",
      explanation:
        "Scammers spoof trust. Never pay government or banks with gift cards, and never share authentication codes.",
    },
    {
      id: "fl12-scenario",
      kind: "scenario",
      title: "Scam decision tree",
      startId: "start",
      nodes: [
        {
          id: "start",
          prompt:
            "A text says Drew's \"package is held\" and links to a payment page for a $2.99 fee. Drew did not order anything — they were just scrolling after school. What first?",
          choices: [
            {
              id: "ignore",
              label: "Do not click; delete/report and verify any real orders separately",
              nextId: "ignore-ok",
              tone: "best",
              feedback: "Unsolicited fee links are a classic lure.",
            },
            {
              id: "click",
              label: "Click and pay quickly so the \"package\" is not destroyed",
              nextId: "click-end",
              tone: "risky",
              feedback: "Urgency plus surprise fees are red flags.",
            },
            {
              id: "codes",
              label: "Call the number in the text and read them a verification code",
              nextId: "codes-end",
              tone: "risky",
              feedback: "Numbers in the lure often reach the scammer.",
            },
          ],
        },
        {
          id: "ignore-ok",
          prompt: "A follow-up call claims to be the bank needing a code \"to cancel the charge.\" Best move?",
          choices: [
            {
              id: "hangup",
              label: "Hang up and contact the bank using a number from the card/app — not the caller",
              nextId: "success",
              tone: "best",
              feedback: "Independent verification stops account-takeover tricks.",
            },
            {
              id: "share",
              label: "Read the code so they can \"protect\" the account",
              nextId: "share-end",
              tone: "risky",
              feedback: "Codes are keys — scammers ask for them.",
            },
          ],
        },
        {
          id: "success",
          ending: {
            title: "Consumer protected",
            body: "You refused the lure, ignored urgency, and verified through official channels. That is consumer self-defense.",
            isSuccess: true,
          },
          prompt: "Done.",
          choices: [],
        },
        {
          id: "click-end",
          ending: {
            title: "Phishing click",
            body: "Surprise fees and threats are designed to skip your judgment. Slow down and verify independently.",
            isSuccess: false,
          },
          prompt: "Done.",
          choices: [],
        },
        {
          id: "codes-end",
          ending: {
            title: "Callback trap",
            body: "Contact info inside a suspicious message is not trustworthy. Look up official contacts yourself.",
            isSuccess: false,
          },
          prompt: "Done.",
          choices: [],
        },
        {
          id: "share-end",
          ending: {
            title: "Code handed over",
            body: "One-time codes prove identity. Real banks will not ask you to read them to an inbound caller.",
            isSuccess: false,
          },
          prompt: "Done.",
          choices: [],
        },
      ],
    },
  ],

  "fl-13": [
    {
      id: "fl13-parsons",
      kind: "parsons",
      title: "First-job tax path",
      prompt:
        "Reorder a sensible sequence for handling taxes around a first job.",
      languageLabel: "process",
      lines: [
        "Complete required new-hire tax forms accurately with a trusted adult if needed",
        "Keep paystubs and year-end tax documents organized",
        "Learn whether you may need to file and which forms apply to your situation",
        "Use reputable filing help or software — avoid \"too good\" refund schemes",
        "Review withholdings if checks look extremely high or low after life changes",
      ],
      lineExplanations: [
        "Accurate new-hire forms come first because they drive withholdings from day one. Guessing or joking on forms can create under- or over-withholding headaches later.",
        "Organizing stubs and year-end documents next means you are ready when filing season arrives. Lost forms slow refunds and increase errors.",
        "Learning filing requirements after you have documents prevents panic myths. Not every teen situation is identical — check guidance for your case.",
        "Reputable filing help beats schemes promising miracle refunds. Scam \"tax helpers\" often target first-time filers.",
        "Reviewing withholdings when life or checks look off keeps take-home aligned with reality. Ignoring weird checks for months makes spring surprises worse.",
      ],
      explanation:
        "Forms → records → know if/how to file → use reputable help → adjust withholdings when needed. Avoid refund scams.",
    },
    {
      id: "fl13-debug",
      kind: "debug",
      title: "Tax myth",
      prompt: "Spot the false tax claim for first jobs.",
      contentLabel: "Buggy claim",
      buggyContent:
        '"Teens never pay any taxes ever. W-2 forms are optional decorations. A stranger DMing \"guaranteed $8,000 refunds\" is normal IRS service. You should share your Social Security number in random group chats for \"fast filing.\""',
      choices: [
        "Many teens have withholdings; keep official forms; avoid refund scams; never share SSN casually",
        "Social Security numbers are public",
        "DM refund guarantees are how the IRS prefers to work",
        "Paystubs should be deleted immediately forever",
      ],
      correctIndex: 0,
      hint: "Who contacts you officially about taxes — and what should stay private?",
      explanation:
        "Treat tax IDs and documents as sensitive. Use official channels and reputable filing tools, not social media miracle offers.",
    },
    {
      id: "fl13-scenario",
      kind: "scenario",
      title: "Tax season decision tree",
      startId: "start",
      nodes: [
        {
          id: "start",
          prompt:
            "A pop-up ad promises Kai a huge refund for a \"small unlock fee\" paid in gift cards. Kai has a real W-2 from a summer lifeguard job. What first?",
          choices: [
            {
              id: "reject",
              label: "Ignore the ad; use official IRS info or a trusted adult/reputable filer",
              nextId: "reject-ok",
              tone: "best",
              feedback: "Gift-card unlock fees are a classic scam pattern.",
            },
            {
              id: "pay",
              label: "Pay the gift-card fee to \"release\" the refund",
              nextId: "pay-end",
              tone: "risky",
              feedback: "Real tax processes do not work that way.",
            },
            {
              id: "ssn",
              label: "Upload SSN and bank info to the unknown site immediately",
              nextId: "ssn-end",
              tone: "risky",
              feedback: "Phishing sites harvest identity data.",
            },
          ],
        },
        {
          id: "reject-ok",
          prompt: "Kai sits down with a parent and the W-2. Best next step?",
          choices: [
            {
              id: "file-right",
              label: "Determine filing needs and use a reputable method; keep copies of what was filed",
              nextId: "success",
              tone: "best",
              feedback: "Calm, documented filing beats viral \"hacks.\"",
            },
            {
              id: "guess",
              label: "Invent income numbers to force a bigger refund",
              nextId: "guess-end",
              tone: "risky",
              feedback: "False returns create legal and financial trouble.",
            },
          ],
        },
        {
          id: "success",
          ending: {
            title: "Tax rookie done right",
            body: "You rejected the scam, used real documents, and filed through reputable channels with records kept. That is first-job tax sense.",
            isSuccess: true,
          },
          prompt: "Done.",
          choices: [],
        },
        {
          id: "pay-end",
          ending: {
            title: "Fee scam",
            body: "Anyone demanding gift cards to release a tax refund is not the government. Stop and get trusted help.",
            isSuccess: false,
          },
          prompt: "Done.",
          choices: [],
        },
        {
          id: "ssn-end",
          ending: {
            title: "Identity risk",
            body: "Your SSN and bank details belong on verified, official workflows — not random pop-up sites.",
            isSuccess: false,
          },
          prompt: "Done.",
          choices: [],
        },
        {
          id: "guess-end",
          ending: {
            title: "False return",
            body: "Inflating numbers for a refund is fraud. Accuracy beats a temporary fake windfall.",
            isSuccess: false,
          },
          prompt: "Done.",
          choices: [],
        },
      ],
    },
  ],

  "fl-14": [
    {
      id: "fl14-parsons",
      kind: "parsons",
      title: "College money sequence",
      prompt:
        "Reorder a smart approach to comparing college costs and aid with your family.",
      languageLabel: "process",
      lines: [
        "Estimate total cost of attendance (not just tuition)",
        "Complete aid applications on time (FAFSA and any school forms)",
        "Compare award letters: grants vs loans vs work expectations",
        "Calculate true out-of-pocket cost and future loan payments",
        "Choose a path you can fund without counting on miracle income",
      ],
      lineExplanations: [
        "Total cost of attendance first prevents sticker-shock blindness. Tuition alone hides housing, food, fees, and transport.",
        "On-time aid applications next unlock grants and work-study you cannot get late. Missing deadlines can cost more than any coupon.",
        "Comparing award letter pieces shows free money versus debt. A bigger \"award\" that is mostly loans is not the same as grants.",
        "Calculating out-of-pocket cost and loan payments turns marketing into a repayment reality check. If you skip this, future-you inherits a surprise bill.",
        "Choosing a fundable path last keeps education aligned with sustainable debt. Hope that \"something will work out\" is not a financing plan.",
      ],
      explanation:
        "Price the full cost, apply for aid on time, separate grants from loans, and pick a plan you can actually repay.",
    },
    {
      id: "fl14-debug",
      kind: "debug",
      title: "Aid myth",
      prompt: "Find the false claim about college costs and aid.",
      contentLabel: "Buggy claim",
      buggyContent:
        '"Sticker price is always what you pay. Student loans are free money. Award letters are identical across schools so you can ignore the details. You should never ask a trusted adult to help compare offers."',
      choices: [
        "Net price varies; loans must be repaid; award details differ; get help comparing offers",
        "Grants always have to be repaid with interest",
        "FAFSA deadlines never matter",
        "Work-study is the same as a credit card",
      ],
      correctIndex: 0,
      hint: "What is the difference between a grant and a loan on an award letter?",
      explanation:
        "Compare net costs carefully. Grants reduce what you owe; loans are debt with a repayment future.",
    },
    {
      id: "fl14-scenario",
      kind: "scenario",
      title: "Award letter decision tree",
      startId: "start",
      nodes: [
        {
          id: "start",
          prompt:
            "School A looks \"cheaper\" monthly because most of the award is loans. School B costs more upfront but has larger grants. What first?",
          choices: [
            {
              id: "compare",
              label: "Compare total grants, loan amounts, and estimated repayment — not vibes",
              nextId: "compare-ok",
              tone: "best",
              feedback: "Loan-heavy \"aid\" can be more expensive long term.",
            },
            {
              id: "vibes",
              label: "Pick the school with the flashiest campus tour and ignore numbers",
              nextId: "vibes-end",
              tone: "risky",
              feedback: "Tours do not pay loan bills.",
            },
            {
              id: "maxloan",
              label: "Take every loan offered without reading terms",
              nextId: "maxloan-end",
              tone: "risky",
              feedback: "Borrowing the maximum is not automatically wise.",
            },
          ],
        },
        {
          id: "compare-ok",
          prompt:
            "After math, School B leaves manageable debt; School A would require much larger loans. Best move?",
          choices: [
            {
              id: "fundable",
              label: "Prefer the fundable path and discuss final choice with a trusted adult",
              nextId: "success",
              tone: "best",
              feedback: "Sustainable financing protects your future budget.",
            },
            {
              id: "deny",
              label: "Choose the high-loan option because \"future me will be rich anyway\"",
              nextId: "deny-end",
              tone: "risky",
              feedback: "Optimistic income guesses are not a repayment plan.",
            },
          ],
        },
        {
          id: "success",
          ending: {
            title: "Aid navigator win",
            body: "You separated grants from loans, compared real costs, and chose a path you can fund. That is college money judgment.",
            isSuccess: true,
          },
          prompt: "Done.",
          choices: [],
        },
        {
          id: "vibes-end",
          ending: {
            title: "Tour trap",
            body: "Feelings matter for fit, but financing needs numbers. Revisit award details before you commit.",
            isSuccess: false,
          },
          prompt: "Done.",
          choices: [],
        },
        {
          id: "maxloan-end",
          ending: {
            title: "Maxed borrowing",
            body: "More loan offers are not more free money. Borrow only what you need after grants and savings.",
            isSuccess: false,
          },
          prompt: "Done.",
          choices: [],
        },
        {
          id: "deny-end",
          ending: {
            title: "Future-me fallacy",
            body: "Assuming guaranteed high income to justify heavy loans is a common regret. Stress-test repayment now.",
            isSuccess: false,
          },
          prompt: "Done.",
          choices: [],
        },
      ],
    },
  ],

  "fl-15": [
    {
      id: "fl15-parsons",
      kind: "parsons",
      title: "Big decision framework",
      prompt:
        "Reorder a careful process for a big money decision (car, move, job tradeoff, etc.).",
      languageLabel: "process",
      lines: [
        "Define the decision and what \"success\" looks like in 1–3 years",
        "List total costs and benefits — including hidden and opportunity costs",
        "Stress-test the choice against lower income or higher expenses",
        "Compare 2–3 realistic alternatives, not just yes/no",
        "Decide, document the why, and set a review date",
      ],
      lineExplanations: [
        "Defining success first keeps the decision from being pure impulse. Without an outcome picture, shiny options win by default.",
        "Listing full costs and benefits next surfaces fees, time, maintenance, and what you give up. Hidden costs are where \"good deals\" die.",
        "Stress-testing against worse conditions prevents fragile plans. If it only works in a perfect month, it is too brittle.",
        "Comparing real alternatives expands the choice set beyond pressure. Yes/no framing hides middle paths like wait, rent, or buy used.",
        "Documenting why and setting a review date turns the choice into a learning loop. Big decisions deserve a post-check, not eternal autopilot.",
      ],
      explanation:
        "Clarify success, price the full tradeoff, stress-test, compare alternatives, then decide with a review date.",
    },
    {
      id: "fl15-debug",
      kind: "debug",
      title: "Decision myth",
      prompt: "Spot the flawed advice about big money decisions.",
      contentLabel: "Buggy advice",
      buggyContent:
        '"If you want it, finance the maximum amount available today. Opportunity cost is irrelevant for personal choices. Never sleep on a big purchase — urgency means it is destiny. Reviews after buying are pointless."',
      choices: [
        "Borrow less not more by default; opportunity cost matters; pause on urgency; review outcomes later",
        "Maximum financing is always optimal",
        "Opportunity cost only applies to video games",
        "Urgent sales never use pressure tactics",
      ],
      correctIndex: 0,
      hint: "Who benefits when you rush and borrow the maximum?",
      explanation:
        "Big decisions need time, full-cost thinking, and humility. Urgency and max financing often serve the seller, not you.",
    },
    {
      id: "fl15-scenario",
      kind: "scenario",
      title: "Car decision tree",
      startId: "start",
      nodes: [
        {
          id: "start",
          prompt:
            "Morgan can buy a flashy car with a long high-payment loan or a reliable used car with lower total cost. Their weekend job income is unstable — senior year hours vary. What first?",
          choices: [
            {
              id: "total",
              label: "Compare total cost, insurance, gas, and payment under a weaker income month",
              nextId: "total-ok",
              tone: "best",
              feedback: "Stress-testing payments matters more than the hood ornament.",
            },
            {
              id: "flash",
              label: "Choose the flashy loan because social status feels urgent",
              nextId: "flash-end",
              tone: "risky",
              feedback: "Status payments can wreck an unstable budget.",
            },
            {
              id: "skipmath",
              label: "Skip insurance estimates because \"it will work out\"",
              nextId: "skipmath-end",
              tone: "risky",
              feedback: "Insurance and maintenance are part of the real price.",
            },
          ],
        },
        {
          id: "total-ok",
          prompt:
            "The used car fits even in a low-income month; the flashy loan does not. Best decision?",
          choices: [
            {
              id: "used",
              label: "Choose the fundable car and set a review date for savings goals",
              nextId: "success",
              tone: "best",
              feedback: "Affordable transportation beats a payment that owns your calendar.",
            },
            {
              id: "stretch",
              label: "Stretch into the flashy loan and cut food and savings to zero",
              nextId: "stretch-end",
              tone: "risky",
              feedback: "Cutting essentials to flex is a fragile plan.",
            },
          ],
        },
        {
          id: "success",
          ending: {
            title: "Decision pro",
            body: "You priced the full cost, stress-tested income, and picked the sustainable option. That is adulting without the lecture.",
            isSuccess: true,
          },
          prompt: "Done.",
          choices: [],
        },
        {
          id: "flash-end",
          ending: {
            title: "Status payment",
            body: "A car payment that only works in perfect months becomes a crisis payment. Revisit total cost and insurance.",
            isSuccess: false,
          },
          prompt: "Done.",
          choices: [],
        },
        {
          id: "skipmath-end",
          ending: {
            title: "Hidden costs",
            body: "Ignoring insurance and upkeep underestimates the decision. Add them before you sign.",
            isSuccess: false,
          },
          prompt: "Done.",
          choices: [],
        },
        {
          id: "stretch-end",
          ending: {
            title: "Brittle budget",
            body: "Zeroing out food and savings to afford a flex car is how emergencies become debt spirals.",
            isSuccess: false,
          },
          prompt: "Done.",
          choices: [],
        },
      ],
    },
  ],

  "fl-16": [
    {
      id: "fl16-parsons",
      kind: "parsons",
      title: "First-year money plan sequence",
      prompt:
        "Reorder a strong sequence for building your first-year-after-high-school money plan.",
      languageLabel: "process",
      lines: [
        "Clarify top goals for the next 12 months",
        "Estimate net income and fixed obligations month by month",
        "Build a simple budget with savings and a starter emergency fund",
        "Set rules for credit, debt, and big purchases",
        "Schedule monthly check-ins to adjust the plan",
      ],
      lineExplanations: [
        "Goals first give the year a direction. Without them the plan is just survive somehow. Missing priorities makes every spend feel equally urgent.",
        "Estimating net income and obligations next anchors the plan in reality. Gross-pay daydreams create budgets that fail in month one.",
        "A simple budget with savings and a starter emergency fund then creates stability. Skipping the buffer leaves the plan one surprise from collapse.",
        "Rules for credit, debt, and big purchases prevent impulse exceptions from rewriting the year. Clear guardrails beat case-by-case debates under pressure.",
        "Monthly check-ins last keep the plan adaptive. Life will change — reviews are how the capstone stays useful past week one.",
      ],
      explanation:
        "Goals → real income/obligations → budget + buffer → borrowing rules → monthly reviews. That is a first-year money plan.",
    },
    {
      id: "fl16-debug",
      kind: "debug",
      title: "Capstone myth",
      prompt: "Spot the weak claim about a first-year money plan.",
      contentLabel: "Buggy claim",
      buggyContent:
        '"Write the plan once in fancy fonts and never look at it again. Skip emergency savings if goals sound exciting. Use credit to fund every want so the plan feels unlimited. Check-ins are only for people who failed."',
      choices: [
        "Plans need reviews; keep a buffer; credit is not unlimited fun money; monthly check-ins are healthy maintenance",
        "Emergency funds cancel your goals permanently",
        "Monthly reviews lower your credit score",
        "Fancy fonts guarantee financial success",
      ],
      correctIndex: 0,
      hint: "Is a money plan a poster — or a living system?",
      explanation:
        "A capstone plan works when it includes buffers, clear credit rules, and regular adjustments — not one-time wishful stationery.",
    },
    {
      id: "fl16-order",
      kind: "order",
      title: "Capstone week-one order",
      prompt:
        "Put these first-week actions for launching a money plan in a sensible order.",
      items: [
        { id: "goals", label: "Write 1–3 money goals with amounts and dates" },
        { id: "numbers", label: "List net income and must-pay expenses" },
        { id: "budget", label: "Draft a budget that fits and funds a small buffer" },
        { id: "automate", label: "Set up tracking and any automatic savings transfers" },
        { id: "calendar", label: "Put a monthly money review on the calendar" },
      ],
      itemExplanations: [
        "Goals first so every later number serves a purpose. Starting with apps before priorities creates busywork without direction.",
        "Income and must-pays next prove what is possible. A pretty budget that ignores rent, transport, or net pay will not survive contact with payday.",
        "Drafting a fitting budget with a small buffer comes after the numbers exist. Buffering before you know obligations is guessing.",
        "Tracking and automation then make the plan operational. Without systems, the draft stays a document you meant to follow.",
        "Calendar reviews last lock in maintenance. If you never schedule the check-in, the plan quietly expires.",
      ],
    },
  ],
};
