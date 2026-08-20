import type { ServiceCopy } from "@/content/service-copy";

/**
 * Engelska tjänstesidor. Nycklarna är samma slugar som i `services.ts`.
 *
 * Myndighetsnamn översätts inte. Skatteverket och Bolagsverket heter så även
 * på engelska i all praktisk kommunikation, och en översättning gör dem
 * svårare att känna igen för läsaren som ska hitta rätt myndighet. Samma sak
 * med F-skatt, K2, K3 och K10, som är namn på svenska regelverk och blanketter.
 */
export const servicesEn: Record<string, ServiceCopy> = {
  "bokforing-och-redovisning": {
    name: "Bookkeeping & accounting",
    shortName: "Bookkeeping",
    metaTitle: "Bookkeeping & accounting | Ongoing bookkeeping at a fixed price",
    metaDescription:
      "We handle the ongoing bookkeeping, reconciliations and ledgers for your company. Digital, at a fixed monthly price, with a named contact who replies the same day.",
    h1Lead: "Bookkeeping and",
    h1Accent: "accounting.",
    intro:
      "Ongoing bookkeeping is the foundation everything else rests on. Get it right and the annual accounts, the VAT and the tax return almost take care of themselves. Get it wrong and you find out when correcting it is expensive.",
    problem: {
      heading: "Why it usually goes wrong",
      paragraphs: [
        "Most business owners do not get their bookkeeping wrong through ignorance, but because it is done too rarely. Receipts pile up in a bag, invoices sit in the inbox, and when the quarter ends three months have to be caught up in one evening. That produces guesswork instead of documentation, and guesswork does not hold up in an audit.",
        "Swedish bookkeeping law requires business events to be recorded on an ongoing basis, with source documents that can be traced from transaction to annual accounts. Cash payments must be recorded no later than the following day, other events as soon as possible. Done in arrears, the company also loses what makes bookkeeping valuable: the ability to see how things are going while there is still time to act.",
        "We take the whole task off you. You photograph or forward the documents, we record them as they arrive, and we tell you when something is missing rather than leaving a gap.",
      ],
    },
    forWhom: [
      {
        title: "Companies that want to stop falling behind",
        text: "If you have a backlog we take that first, then set up a routine that holds.",
      },
      {
        title: "Owners who want to see how it is going",
        text: "Ongoing bookkeeping means the result is current when you need it, not in March the following year.",
      },
      {
        title: "Companies changing accountants",
        text: "We collect the records from your current firm and take over from any month end.",
      },
    ],
    details: [
      {
        title: "Ongoing bookkeeping",
        lead: "Every business event recorded on time, to the right account, with documentation that holds.",
        body: [
          "We record incoming and outgoing invoices, receipts, bank transactions, salaries and tax payments continuously through the year. Each entry gets a voucher number in an unbroken sequence and is linked to its source document, so the chain from bank statement to income statement can be followed backwards. That chain is what Skatteverket and any auditor actually examine.",
          "Accounts are coded against the BAS chart of accounts and adapted to your operations. A construction company and a consultancy should not have the same account structure, because they need to follow different things. We set up the chart of accounts so that it says something about your business, rather than applying a standard template as is.",
          "Accounting records are archived digitally for seven years after the end of the financial year, as the law requires. The documents are searchable, which means a question about a two year old invoice takes minutes to answer instead of an afternoon with a binder.",
        ],
      },
      {
        title: "Accounting",
        lead: "The figures compiled into something you can make decisions on.",
        body: [
          "Bookkeeping is recording. Accounting is making the records intelligible. We produce income statements and balance sheets each period and go through what they mean: where the margin sits, which costs are growing faster than revenue, and how it compares with the same period last year.",
          "Accruals are what separate a report you can rely on from one that swings for no reason. An annual insurance premium paid in January does not belong as a cost in January alone, and a customer prepayment is not revenue until the work is done. We accrue continuously so that each month shows its own result.",
          "Reports are sent in the format you prefer, and we would rather call once too often when something looks off than let you discover it yourself in the annual accounts.",
        ],
      },
      {
        title: "Bank reconciliation",
        lead: "The bookkeeping reconciled against the bank statement, every period.",
        body: [
          "A bank reconciliation means the balance in the books is compared entry by entry against what the bank actually shows. Any difference must be explainable, for example a payment in transit that the bank has not yet recorded. If a difference cannot be explained there is an error somewhere, and that error grows if it is left alone.",
          "The reconciliation is also what catches things that otherwise slip through: a double paid invoice, a subscription still being charged despite cancellation, a card payment with no receipt. We contact you about every entry we cannot match to a document.",
          "Where possible we connect the bank feed directly to the accounting system, so transactions arrive automatically and the reconciliation becomes a check rather than a data entry task.",
        ],
      },
      {
        title: "Tax account reconciliation",
        lead: "The tax account reconciled against the books, so the balance means something.",
        body: [
          "The tax account at Skatteverket collects VAT, employer contributions, withheld tax, preliminary tax and any F-skatt payments in one place. That makes it hard to read: a deficit can have five different causes, and a surplus does not necessarily mean the company has money to spare.",
          "We reconcile the tax account against the books each period, so that every transaction on the account has a counterpart in the bookkeeping and the other way round. That lets you trust the balance, and means a deficit is spotted before interest starts running.",
          "We also monitor that payments arrive on time. Money that reaches the tax account late incurs interest even when the amount is correct, and that is an entirely avoidable cost.",
        ],
      },
      {
        title: "Invoice handling",
        lead: "Supplier and customer invoices through a flow that does not lose anything.",
        body: [
          "Incoming invoices are received digitally, interpreted and recorded to the right account and the right period. You get a payment list showing what is due and when, instead of tracking due dates across three different inboxes yourself. Invoices with discrepancies are raised with you before they are paid.",
          "On the outgoing side we help with invoice documentation, VAT rates and the details an invoice must contain under Swedish VAT law: invoice number in an unbroken series, date, the parties' details and VAT registration numbers, what has been sold, the taxable amount and the VAT. An invoice missing any of these can cause the buyer problems with deducting VAT, and will come back.",
          "If you sell to the public sector, e-invoicing under the Peppol standard is also required. We make sure the format is right so the invoice goes through instead of being rejected.",
        ],
      },
      {
        title: "Accounts receivable & payable",
        lead: "Full control of what is outstanding, in both directions.",
        body: [
          "The accounts receivable ledger shows which invoices are outstanding and for how long. It is the single most important report for liquidity in a small company, and the one most often missing. We keep it current and report what is overdue, so you can chase in good time instead of discovering an unpaid invoice six months later when it has become hard to collect.",
          "The accounts payable ledger shows the same thing from the other direction: what the company owes and when it falls due. Together they give a picture of cash flow a few weeks ahead, which is the difference between planning and hoping.",
          "We can also handle the reminder routine. Many business owners hesitate to chase payment from customers they want to keep, and then it often does not happen at all. When the reminder comes from the accounting firm it becomes routine rather than a confrontation.",
        ],
      },
    ],
    deliverables: [
      "Ongoing bookkeeping of all business events",
      "Bank and tax account reconciliation every period",
      "Income statement and balance sheet with a walkthrough",
      "Accounts receivable and payable kept current",
      "Digital archive for seven years, searchable",
      "A named contact who replies the same day",
    ],
    faq: [
      {
        question: "How often must the bookkeeping be done?",
        answer:
          "Swedish law says on an ongoing basis. Cash payments must be recorded no later than the following day, other business events as soon as possible. In practice we record monthly, and more often for companies with high transaction volumes.",
      },
      {
        question: "We are several months behind. Will you still take us on?",
        answer:
          "Yes, and it is more common than you think. We catch up the history first and then set up a routine so it does not happen again. The catch up work is priced separately and you get the figure before we start.",
      },
      {
        question: "Do we have to change accounting software?",
        answer:
          "No. We work in cloud based systems and adapt to what you already use if it works. If it does not we will say so plainly and suggest a change, but the decision is yours.",
      },
      {
        question: "How do I send you the documents?",
        answer:
          "A photo on your phone, a forwarded email or directly in the bookkeeping app. You choose what suits you. We tell you when something is missing rather than recording a guess.",
      },
      {
        question: "Can I throw away the receipt once it is photographed?",
        answer:
          "Since summer 2024 the paper original may be destroyed once the information has been transferred to digital form in a durable way, provided nothing is lost. We make sure the transfer meets that requirement.",
      },
      {
        question: "What does ongoing bookkeeping cost?",
        answer:
          "We work with a fixed monthly price. It is driven by the volume of documents and whether payroll is included, and you get a fixed figure before we start, not a running invoice.",
      },
    ],
  },

  "lon-moms-och-deklaration": {
    name: "Payroll, VAT & tax returns",
    shortName: "Payroll and VAT",
    metaTitle: "Payroll, VAT & tax returns | Payroll administration and VAT reporting",
    metaDescription:
      "Payroll administration, VAT reporting, employer declarations and income tax returns for limited companies and sole traders. Right amounts, filed on time, at a fixed price.",
    h1Lead: "Payroll, VAT and",
    h1Accent: "tax returns.",
    intro:
      "These are the tasks with dates attached. Miss a deadline and it costs money however correct the figures are, and the delays almost always come from nobody knowing it was due.",
    problem: {
      heading: "The hard part is not the arithmetic",
      paragraphs: [
        "A small company with employees has a recurring schedule to keep: an employer declaration at individual level every month, a VAT return monthly or quarterly depending on turnover, payment to the tax account in good time before the due date, and an income tax return once a year. Each has its own date, and they do not coincide.",
        "Beyond the schedule are the details that go wrong: benefits that must be reported, per diems that are tax free only up to a limit, the qualifying deduction on sick pay, holiday pay under one of two calculation rules, VAT rates that differ between 25, 12 and 6 per cent, and services that are exempt entirely. None of these is difficult on its own. Together they are a full time job to keep track of.",
        "We take the whole schedule and all the details. You get a reminder of what is to be paid and when, and never have to keep a date in your head.",
      ],
    },
    forWhom: [
      {
        title: "Companies with employees",
        text: "Payroll, employer declarations and reporting every month, without you having to think about it.",
      },
      {
        title: "Companies invoicing with VAT",
        text: "The right VAT rate, the right period and the right payment, even when the business has mixed rates.",
      },
      {
        title: "Owners who want the right salary",
        text: "We calculate your drawings during the year, while the tax can still be influenced.",
      },
    ],
    details: [
      {
        title: "Payroll administration",
        lead: "Payroll runs, payslips and everything around them, every month.",
        body: [
          "We calculate salary, holiday pay, sick pay with the qualifying deduction, unsocial hours supplements, overtime and any benefits, and send a payslip to each employee. The payment file comes to you for approval, so money never leaves the company without your yes. The underlying data is reported to Skatteverket in the employer declaration.",
          "Holiday pay is what is most often miscalculated in a small company. The two permitted methods give different results, and which applies depends on the type of employment and how the salary is structured. The holiday pay liability must also be provided for in the books, otherwise the result shows a profit that does not exist.",
          "Benefits are the other area. A company car, wellness allowance above the limit, free parking and staff discounts all have their own rules for when they are tax free and how they are valued. We assess each benefit and report it correctly, so it does not appear as a surprise in the employee's tax return.",
        ],
      },
      {
        title: "VAT reporting",
        lead: "The right VAT rate, the right period, filed on time.",
        body: [
          "We compile output and input VAT per period and file the VAT return. How often depends on the company's turnover: smaller companies report annually, most quarterly and larger companies monthly. We make sure the company is on the right period and change it when turnover changes.",
          "There are three VAT rates. Most things sit at 25 per cent, food and restaurant meals at 12, and books, newspapers and passenger transport at 6. On top of that there is business that is exempt entirely, such as healthcare, dental care and education, and there the company may not deduct VAT on its purchases either. If you run mixed operations the input VAT must be apportioned, and that is where the errors usually sit.",
          "Cross border trade has its own rules. Selling to a VAT registered business in another EU country means invoicing without VAT but filing an EC sales list. Buying services from abroad triggers reverse charge, meaning you report both output and input VAT yourself. We handle both.",
        ],
      },
      {
        title: "Employer declarations",
        lead: "Reporting at individual level every month, with the right contributions.",
        body: [
          "The employer declaration is filed monthly and reports, per employee, what has been paid out, what tax has been withheld and what employer contributions are due. Since individual level reporting was introduced there are no annual statements to correct afterwards, which means an error has to be corrected in the period where it arose.",
          "Employer contributions are not the same for everyone. The employee's age governs the rate, and lower contributions apply for the youngest and oldest. There are also reductions and support schemes that may be relevant depending on the situation. We apply the right rate per person rather than one blanket figure for the whole company.",
          "The declaration and the payment share a due date, normally the 12th of the month following payment, with exceptions in January and August. We file on time and tell you exactly what amount must be on the tax account and on which date.",
        ],
      },
      {
        title: "Income tax returns for limited companies and sole traders",
        lead: "The company's return, and your own where they connect.",
        body: [
          "For limited companies we prepare the corporate tax return with the accompanying tax adjustments. The accounting result is rarely the same as the taxable result: entertainment expenses, certain taxes, allocations to the tax allocation reserve and excess depreciation adjust the figure in different directions. We calculate the taxable result and make sure the allocations are used where they actually help.",
          "If you are a shareholder in a closely held company we also prepare the K10 documentation. It determines how much you can take as a dividend at the lower tax rate, and the allowance is calculated either under the simplification rule or under the salary based rule. Which gives more depends on the company's salaries and your own drawings during the year, and the decision has to be made while the year is running.",
          "For sole traders it is the NE schedule to your personal tax return, with social security contributions, any interest allocation and allocations to the expansion fund. Here the line between the business and your private finances is decisive, and we keep it clear so the deductions hold up under review.",
        ],
      },
    ],
    deliverables: [
      "Payroll runs with payslips to employees",
      "Employer declarations at individual level every month",
      "VAT returns in the right period, reconciled",
      "EC sales lists for EU trade",
      "Income tax return for the company",
      "K10 documentation for shareholders",
      "Notice of what is to be paid and when",
    ],
    faq: [
      {
        question: "How often must VAT be reported?",
        answer:
          "It depends on turnover. Smaller companies report annually, most quarterly and larger companies monthly. We check that your company is on the right period and change it when turnover changes.",
      },
      {
        question: "How much salary should I draw from my limited company?",
        answer:
          "It depends on whether you want to use the salary based rule for dividends, which requires your own salary to exceed a threshold linked to the company's total payroll. We calculate the threshold during the autumn, while it can still be adjusted.",
      },
      {
        question: "What happens if the return is filed late?",
        answer:
          "Skatteverket charges a late filing fee, and unpaid amounts accrue interest on the tax account. We file on time and remind you about the payment well before the due date.",
      },
      {
        question: "Is a wellness allowance tax free?",
        answer:
          "Yes, up to a reasonable amount and if it is offered to all employees on equal terms. If the allowance exceeds the limit the whole amount becomes a taxable benefit, not just the excess. We keep an eye on the level.",
      },
      {
        question: "We use subcontractors rather than employees. Does that make it simpler?",
        answer:
          "Yes, if it genuinely is a contracting relationship. If the person has only one client, works your hours and uses your tools, Skatteverket may reassess it as employment, and then the employer contributions become yours. We review the arrangement before it becomes a problem.",
      },
      {
        question: "Can you handle payroll even if you do not do our bookkeeping?",
        answer:
          "Yes, but it is rarely cheaper. Payroll and bookkeeping are connected, and when the same firm does both, the reconciliation work between them disappears.",
      },
    ],
  },

  "bokslut-och-arsredovisning": {
    name: "Annual accounts & annual reports",
    shortName: "Annual accounts",
    metaTitle: "Annual accounts & annual reports | Preparation, corrections and reviews",
    metaDescription:
      "We prepare annual accounts and annual reports under K2 or K3, handle requests for correction from Bolagsverket and request reviews when tax has been assessed incorrectly.",
    h1Lead: "Annual accounts and",
    h1Accent: "annual reports.",
    intro:
      "The annual accounts are the year summarised and closed. They are also the last chance to make decisions that affect the tax, which means accounts that merely compile figures have missed half their purpose.",
    problem: {
      heading: "Closing the year is not compilation, it is decisions",
      paragraphs: [
        "Closing the year settles things the bookkeeping does not show: how inventory is valued, which receivables are doubtful, how equipment is depreciated, whether an allocation to the tax allocation reserve is the right move this year or next. Each such choice affects both the result and the tax, and most cannot be changed afterwards.",
        "A limited company must also hold its annual general meeting within six months of the financial year end and file the annual report with Bolagsverket no later than seven months after the same date. Filed late, a penalty fee is charged, and if it drags on long enough the company can be forced into liquidation. The fee is entirely avoidable, yet it catches many companies every year.",
        "We work on the annual accounts before the year end, not after. That is when the choices still exist.",
      ],
    },
    forWhom: [
      {
        title: "Limited companies with a filing obligation",
        text: "An annual report under K2 or K3, filed digitally with Bolagsverket on time.",
      },
      {
        title: "Companies that have received a request",
        text: "If Bolagsverket has asked for a correction we help with the response and make sure it is sufficient.",
      },
      {
        title: "Companies with an error in an old decision",
        text: "Tax assessed incorrectly can often be reviewed several years back. We assess whether it is worth pursuing.",
      },
    ],
    details: [
      {
        title: "Annual accounts",
        lead: "The year closed, reconciled and thought through for tax.",
        body: [
          "We reconcile every balance sheet account against source documentation, review accruals, value inventory and work in progress, assess trade receivables and calculate depreciation on equipment. The result is a balance sheet where every item can be explained, which is the precondition for everything built on top of it.",
          "Then come the decisions. An allocation to the tax allocation reserve defers tax and can be right when a weaker year is expected, but wrong when the company is facing an investment. Excess depreciation offers the same kind of choice. We calculate what each alternative means in kronor and put it to you, rather than choosing for you without asking.",
          "The accounts are delivered with a walkthrough where we go through the year: what drove the result, what deviated and what the figures say about next year. That walkthrough is often the most valuable thing an accounting firm provides, and the thing most often left out.",
        ],
      },
      {
        title: "Annual reports",
        lead: "Prepared under the applicable framework, signed and filed on time.",
        body: [
          "We prepare the annual report with the directors' report, income statement, balance sheet, notes and, for larger companies, a cash flow statement. It is filed digitally with Bolagsverket, which gives faster processing and a receipt confirming it has arrived, instead of the uncertainty of a paper filing.",
          "The choice between K2 and K3 governs how the accounts may be presented. K2 is a simplified framework with more standardisation and less room for judgement, K3 is more work but permits component depreciation and capitalisation of internally generated development work. For most smaller companies K2 is right, but not for all. We go through what suits your company and change framework if the conditions change.",
          "We keep track of the dates for you: the meeting within six months of the financial year end, the annual report with Bolagsverket within seven. You get a reminder in good time, with the documents to be signed.",
        ],
      },
      {
        title: "Requests for correction",
        lead: "When Bolagsverket or Skatteverket wants more, we respond.",
        body: [
          "A request for correction means something is missing or does not hold: a signature that is absent, a certification incorrectly dated, notes that are insufficient, or details that do not match the register. The request has a deadline, and an unanswered request has the same consequence as never filing at all.",
          "We read the request, work out exactly what the authority is asking for and prepare the response. Often it is a formality that looks more serious than it is, but it needs to be handled correctly and within the time limit. We respond on your behalf and confirm when the matter is closed.",
          "If the request stems from a genuine error in the accounts we correct that too, rather than patching together a response that holds this time but raises the same question next year.",
        ],
      },
      {
        title: "Requests for review",
        lead: "Tax assessed incorrectly can often be corrected several years back.",
        body: [
          "If a deduction was missed, income was reported twice or a decision was based on incorrect information, you can request a review from Skatteverket. The window normally extends six years back, counted from the end of the calendar year in which the tax year ended, which means old errors can be corrected more often than most people think.",
          "We go through what actually happened, gather the documentation that supports the point and draft the request. A review is decided on the evidence, not on the wording, so the work lies in substantiating what is to be corrected. If the evidence does not hold we say so before filing, rather than pursuing a case that will fail anyway.",
          "If the decision goes against you we assess whether an appeal is worth pursuing, with a straight estimate of the chances. Sometimes the answer is no, and then we say so.",
        ],
      },
    ],
    deliverables: [
      "Complete annual accounts with reconciled balance sheet accounts",
      "A tax review before the year is closed",
      "Annual report under K2 or K3",
      "Digital filing with Bolagsverket",
      "Responses to requests and corrections",
      "Requests for review when tax has been assessed incorrectly",
      "A walkthrough where we explain the year",
    ],
    faq: [
      {
        question: "When must the annual report be filed?",
        answer:
          "It must reach Bolagsverket no later than seven months after the end of the financial year, and the annual general meeting must have been held within six months. With a 31 December year end that means a meeting by June and filing by 31 July.",
      },
      {
        question: "What does it cost if the annual report is filed late?",
        answer:
          "Bolagsverket charges a penalty fee that increases in steps the longer it takes, and after a very long delay the company can be forced into liquidation. The fee is entirely avoidable, and we remind you in good time.",
      },
      {
        question: "Does our company need an auditor?",
        answer:
          "Smaller limited companies are exempt unless they exceed more than one of three thresholds for employees, balance sheet total and net turnover in two consecutive financial years. We monitor the figures and give you notice in good time if you are approaching the limit, since the auditor must be appointed at a general meeting.",
      },
      {
        question: "Should we apply K2 or K3?",
        answer:
          "K2 is simpler and sufficient for most smaller companies. K3 is required for larger companies and can be advantageous if you want component depreciation on property or to capitalise development work. We go through what suits you.",
      },
      {
        question: "How far back can a tax decision be reviewed?",
        answer:
          "Normally six years, counted from the end of the calendar year in which the tax year ended. We assess whether your case holds before we file anything.",
      },
      {
        question: "Can you prepare the annual accounts even if someone else did the bookkeeping?",
        answer:
          "Yes. We then review the ongoing bookkeeping first and tell you if anything needs correcting before we close the year. There is additional work for the review, and you get the figure in advance.",
      },
    ],
  },

  "foretagsstart-och-registreringar": {
    name: "Company formation & registrations",
    shortName: "Company formation",
    metaTitle: "Company formation & registrations | Start a limited company or sole trader business",
    metaDescription:
      "We help you choose the right company form, register with Bolagsverket and Skatteverket and get F-skatt, VAT and permits in place. Right from the start.",
    h1Lead: "Company formation and",
    h1Accent: "registrations.",
    intro:
      "The decisions made in the first few weeks stay with the company for years. Company form, financial year, ownership structure and the registered scope of business are all easy to get wrong and awkward to change afterwards.",
    problem: {
      heading: "The hard part is not the forms",
      paragraphs: [
        "Registering a company takes an afternoon on verksamt.se. That is not where the problem lies. The problem is that several of the choices in the form have consequences that do not show until much later: the financial year determines when your first set of accounts falls due, the shareholdings govern how dividends may be distributed, and the description of the business can limit what the company is permitted to do.",
        "Many also start in the wrong form. A sole trader business is simpler and cheaper at the outset but means personal liability, and the profit is taxed as business income with social security contributions. A limited company requires share capital and more administration but gives limited liability and the option of dividends at a lower tax rate. Which is right depends on profit level, risk and how much you need to draw, not on which sounds more serious.",
        "We go through the choices before anything is registered, and then handle the whole registration for you.",
      ],
    },
    forWhom: [
      {
        title: "First time founders",
        text: "We go through the company forms using your figures as the starting point, not a rule of thumb.",
      },
      {
        title: "Sole traders converting to a limited company",
        text: "We calculate whether it pays off and handle the conversion so nothing falls between the cracks.",
      },
      {
        title: "Businesses that require permits",
        text: "Alcohol licences, F-skatt, employer registration and industry registrations in place from the start.",
      },
    ],
    details: [
      {
        title: "Company formation",
        lead: "From idea to registered company, with the right decisions made in the right order.",
        body: [
          "We start with your situation: what the business does, what profit you expect, whether you will have employees, how great the risk is and how much you need to draw privately. From that we calculate what the different company forms would actually cost you in tax and contributions, and recommend one.",
          "Then we make the choices that otherwise get made by accident. The financial year does not have to follow the calendar year, and a non calendar year can be right if the business is seasonal. The shareholdings need to match how you intend to distribute profit, and if there are several of you a shareholders' agreement should exist before it is needed, not after.",
          "We also set up the practical side: bank account, accounting system, invoicing routine and a plan for how documents reach us. That is the part that determines whether the company gets going properly or falls behind in its first quarter.",
        ],
      },
      {
        title: "Company registration",
        lead: "Registration with Bolagsverket, with documents that hold.",
        body: [
          "We prepare the memorandum of association and the articles of association, handle the bank certificate for the share capital and file the registration. The articles of association are the document most often rushed, and they govern things like the object of the business, the limits on share capital and how notice of general meetings is given. Articles that are too narrow force an amendment and a new fee as soon as the business broadens.",
          "The share capital in a private limited company is SEK 25,000 and must be in a designated account at registration. It is the company's money, not locked funds, and can be used in the business as soon as the company is registered. We explain what applies so the capital is not left sitting idle.",
          "We also keep the registration current afterwards: a change of board, address, authorised signatory or articles must be notified, and a registration that does not match reality only causes problems when something important needs signing.",
        ],
      },
      {
        title: "Skatteverket & Bolagsverket",
        lead: "F-skatt, VAT and employer registration, filed in the right order.",
        body: [
          "Applications for F-skatt, VAT registration and registration as an employer are made with Skatteverket and are separate from the registration with Bolagsverket. They are often handled in the wrong order or forgotten, with the result that the company invoices without being VAT registered or pays salaries without being a registered employer.",
          "We file what is needed and set a realistic preliminary tax from the start. Preliminary tax set too low produces a tax bill with interest, set too high it ties up money unnecessarily all year. We work from your actual forecast and adjust during the year when reality differs.",
          "If the company trades internationally we also apply for an EORI number and make sure the VAT registration number is correctly registered in VIES, so your EU customers can verify it. A number that cannot be looked up stops an invoice.",
        ],
      },
      {
        title: "Choice of company form",
        lead: "Calculated on your figures, not on a rule of thumb.",
        body: [
          "A sole trader business has no minimum capital, simpler bookkeeping, and you are taxed on the whole surplus with social security contributions and municipal income tax. At low profit it is almost always cheapest. The drawback is that you are personally liable for the debts, and that there is no distinction between the business's money and yours.",
          "A limited company gives limited liability and the option of taking part of the profit as a dividend taxed at 20 per cent within the allowance. It requires share capital, an annual report and more administration. The point at which a limited company becomes advantageous is not a fixed figure but depends on how much you draw, whether you have employees and how great the risk in the business is.",
          "Partnerships and limited partnerships appear where several people run a business together but want to avoid the formalities of a limited company. They carry joint and several liability, meaning each partner can be pursued for the entire debt. We go through whether the form suits you before you choose it because it seemed convenient.",
        ],
      },
      {
        title: "Permits & registrations",
        lead: "The industry specific requirements that must exist before you open.",
        body: [
          "Many businesses need more than a company registration number to start. Food businesses must be registered with the municipality, serving alcohol requires a licence with both a knowledge test and an assessment of financial propriety, and commercial transport requires an operator's licence. Processing times are rarely short.",
          "Some industries also have requirements for staff registers, certified cash registers or notification of construction sites. The requirements attach to the activity, not the company form, and they are checked without notice. Starting without them is an expensive way to save time.",
          "We go through what your particular business requires, help with the applications and set a timetable based on the processing times rather than on when you want to open.",
        ],
      },
    ],
    deliverables: [
      "A review of company form calculated on your figures",
      "Memorandum and articles of association",
      "Registration with Bolagsverket",
      "F-skatt, VAT and employer registration",
      "Preliminary tax set on a real forecast",
      "A map of the permits your industry requires",
      "Bookkeeping and invoicing routine in place from day one",
    ],
    faq: [
      {
        question: "How much share capital does a limited company require?",
        answer:
          "SEK 25,000 in a private limited company. The money belongs to the company and may be used in the business as soon as the company is registered, it is not locked away.",
      },
      {
        question: "Should I start a sole trader business or a limited company?",
        answer:
          "At low profit a sole trader business is almost always cheapest. A limited company becomes advantageous as profit rises, where the risk in the business is significant, or where you want to be able to take dividends. We calculate on your figures rather than answering with a rule of thumb.",
      },
      {
        question: "How long does it take to register a limited company?",
        answer:
          "Processing times at Bolagsverket vary through the year and are shorter for electronic applications. We file as soon as the documents are ready and keep you updated on where the matter stands.",
      },
      {
        question: "Can I convert my sole trader business into a limited company?",
        answer:
          "Yes. The business is then transferred to the new company, and the transfer has to be done correctly to avoid triggering unnecessary taxation. We first calculate whether the change pays off, then handle the conversion.",
      },
      {
        question: "Do I need F-skatt?",
        answer:
          "Without F-skatt, whoever engages you must deduct tax and pay employer contributions on the fee, which makes you difficult to hire. In practice everyone who invoices needs F-skatt, and we apply for it on your behalf.",
      },
      {
        question: "Can I choose a financial year other than the calendar year?",
        answer:
          "Yes, a limited company may have a non calendar financial year. It can be advantageous for seasonal businesses since the year end then falls in a quieter period. We go through whether it suits you.",
      },
    ],
  },

  "myndighetskontakt-och-radgivning": {
    name: "Dealing with authorities & advisory",
    shortName: "Advisory",
    metaTitle: "Dealing with authorities & advisory | Support with Skatteverket and municipalities",
    metaDescription:
      "We deal with Skatteverket, Bolagsverket and the municipality, respond to requests and advise on tax matters. In Swedish, English and Persian.",
    h1Lead: "Dealing with authorities and",
    h1Accent: "advisory.",
    intro:
      "A letter from Skatteverket creates far more worry than its contents warrant. Most of it is routine, some of it needs a proper response, and telling the difference is hard unless you read such letters every week.",
    problem: {
      heading: "The uncertainty costs more than the matter",
      paragraphs: [
        "Most requests and enquiries are about a missing detail or something that needs substantiating. They are manageable. But they arrive in a language and a format that is hard going even for the experienced, and for a business owner running their company in another mother tongue the threshold is higher than it needs to be.",
        "The result is that letters are left unopened. An enquiry answered within the deadline is usually closed with no further action. The same enquiry unanswered leads to a decision made on whatever information the authority already holds, which is almost always worse for the company. A discretionary assessment is considerably harder to have changed than an enquiry is to answer.",
        "We read the letter, tell you what it actually means and respond on your behalf where the question concerns bookkeeping, tax or tax returns.",
      ],
    },
    forWhom: [
      {
        title: "You who received a letter and do not know what it means",
        text: "Send it over. We tell you what it concerns, how urgent it is and what needs to be done.",
      },
      {
        title: "Business owners with another mother tongue",
        text: "Advice in Swedish, English and Persian. You should understand your own finances, not just sign for them.",
      },
      {
        title: "Companies facing a bigger decision",
        text: "An investment, a hire, a change of ownership or an expansion. We calculate the consequence before you decide.",
      },
    ],
    details: [
      {
        title: "Authorities & municipalities",
        lead: "We make the contact, so you avoid the phone queue.",
        body: [
          "We handle ongoing contact with Skatteverket, Bolagsverket, the Enforcement Authority and municipal departments in matters concerning the company's finances. That covers everything from clarifying a balance on the tax account to following up a registration that has stalled.",
          "With a power of attorney we can represent the company directly, which means the matter can be resolved without involving you. Without one we prepare the material and tell you exactly what to say and to whom. Which suits best is your choice.",
          "Municipal matters have their own routes: food registration, alcohol licences, building permits and supervisory fees are handled by different departments with different processing times. We keep track of where the matter stands and push when it is needed.",
        ],
      },
      {
        title: "Support in dealings with authorities",
        lead: "Requests, enquiries and inspections, answered on time.",
        body: [
          "When Skatteverket requests documentation or questions an item, we go through what is being asked, gather the material and draft the response. A response that is complete the first time closes the matter. An incomplete response leads to a follow up question and extends the process, sometimes by months.",
          "In an audit or an unannounced inspection the preparation is already done if the bookkeeping is in order. We produce what is to be handed over, take part in the contact and make sure nothing is disclosed that was not requested. Staff registers and cash registers are checked on site in some industries, and there the outcome is decided by the routines, not by the answers.",
          "If a decision goes against the company we assess whether there are grounds for a review or an appeal, and say plainly when we think a matter is not worth pursuing further.",
        ],
      },
      {
        title: "Tax matters",
        lead: "An answer before you act, not an explanation afterwards.",
        body: [
          "Most tax questions in a small company concern the line between the company and the individual: what may be deducted, which benefits are tax free, how a car is treated, what applies when working from home and how entertainment is handled. The answers exist, but they depend on the circumstances, and a general rule of thumb often leads the wrong way.",
          "For closely held companies the 3:12 rules are the question that matters most in kronor. The allowance determines how much can be taken as a dividend at 20 per cent tax, and it is calculated either under the simplification rule or under the salary based rule. Which is better is determined by the company's payroll and your own drawings, and the calculation has to be done during the year to be actionable.",
          "In changes of ownership, succession and the sale of a company, the tax question becomes decisive for the outcome. We go through the consequences in advance and say when the matter requires a specialist beyond us.",
        ],
      },
      {
        title: "Financial advisory",
        lead: "The figures used to make decisions, not just to report.",
        body: [
          "We review profitability per service or product, pricing, margins and what the cost base consists of. Many companies grow in turnover without growing in profit, and the cause is almost always visible in the figures long before it shows up in the bank account.",
          "Liquidity planning is the other part. A company rarely fails because it is unprofitable, but because the money runs out at the wrong moment. We set up a simple forecast showing how the cash position develops over the coming months, with tax payments, salaries and known investments included.",
          "Ahead of an investment, a hire or an expansion we calculate what the decision means: what it costs, what volume it needs to carry itself and how it affects the tax. You get something to decide on, and our view when you ask for it.",
        ],
      },
      {
        title: "Commercial legal guidance",
        lead: "Contracts and company matters reviewed before they become disputes.",
        body: [
          "We review customer and supplier contracts with a focus on what has financial consequences: payment terms, late payment interest, limitations of liability, notice periods and what happens if the counterparty fails to deliver. A contract with 90 day payment terms is a financing decision, whatever it says on the page.",
          "For companies with several owners the shareholders' agreement is the most important document that is most often missing. It governs what happens when someone wants to sell, leave, falls ill or dies, and it needs to be written while everyone is still in agreement. We go through what such an agreement should contain for your situation.",
          "We are accounting consultants, not lawyers. We say when a question requires a solicitor and help formulate the brief, rather than giving an answer that sounds reassuring but does not hold.",
        ],
      },
    ],
    deliverables: [
      "A review of letters and requests within one day",
      "Responses to Skatteverket and Bolagsverket on your behalf",
      "Representation under power of attorney when you want it",
      "Answers on tax matters before you act",
      "Calculation of the dividend allowance",
      "Liquidity forecast and profitability review",
      "Advice in Swedish, English and Persian",
    ],
    faq: [
      {
        question: "I have received a letter from Skatteverket. What do I do?",
        answer:
          "Send it to us and we will read it and tell you what it concerns, how urgent it is and what needs to be done. If it relates to bookkeeping, VAT or tax returns we respond on your behalf.",
      },
      {
        question: "Can you speak to Skatteverket on my behalf?",
        answer:
          "Yes, with a power of attorney we represent the company directly. Without one we prepare the material and tell you exactly what to say and to whom.",
      },
      {
        question: "Can I get advice in Persian?",
        answer:
          "Yes. We advise in Swedish, English and Persian, and you can write to us in whichever language you are most comfortable with.",
      },
      {
        question: "What happens if I do not answer an enquiry?",
        answer:
          "Skatteverket then decides on the information it already holds, which is almost always worse for the company. Such a decision is considerably harder to have changed than the enquiry was to answer.",
      },
      {
        question: "Is advice included in the monthly price?",
        answer:
          "Ongoing questions about bookkeeping, VAT and tax are included. Larger investigations and matters requiring extensive work are quoted separately, and you get the figure before we start.",
      },
      {
        question: "Do you provide legal advice?",
        answer:
          "We give guidance on commercial legal questions with financial implications, such as contract terms and owner matters. When a question requires a solicitor we say so rather than answering anyway.",
      },
    ],
  },

  "digitalisering-och-struktur": {
    name: "Digitalisation & structure",
    shortName: "Digitalisation",
    metaTitle: "Digitalisation & structure | Digital bookkeeping routines that last",
    metaDescription:
      "We digitalise your bookkeeping routines, set up digital workflows and ongoing reporting, and build routines that work even when everyone is busy.",
    h1Lead: "Digitalisation and",
    h1Accent: "structure.",
    intro:
      "A digital accounting system does no good in itself. The benefit comes from documents reaching the system automatically, from someone looking at the figures every month, and from the routine working even in the weeks when nobody has time.",
    problem: {
      heading: "A system is not a routine",
      paragraphs: [
        "Most companies already have cloud based accounting software. Yet the receipts still arrive in a bag once a quarter, supplier invoices sit in the inbox and nobody quite knows how things are going until the annual accounts are done. The system was never the problem.",
        "What is missing is the flow: how a receipt gets from your hand into the books without anyone having to remember it, how a supplier invoice lands in the right place without manual entry, and who does what when the person who usually handles it is off sick. A routine that only works when everything is calm is not a routine.",
        "We build the flow and the routine, not just the system. The goal is for administration to take less of your time each month, not for it to look more modern.",
      ],
    },
    forWhom: [
      {
        title: "Companies still handling paper",
        text: "We move the flow across in stages so the business does not stop during the change.",
      },
      {
        title: "Companies that have outgrown their routine",
        text: "What worked with ten invoices a month rarely works with a hundred.",
      },
      {
        title: "Owners who want to know how it is going",
        text: "Ongoing reporting means you see the result while it can still be influenced.",
      },
    ],
    details: [
      {
        title: "Digitalising bookkeeping routines",
        lead: "From binder and bag to a flow that runs itself.",
        body: [
          "We start by mapping how documents actually move today: where receipts end up, how invoices arrive, who approves them and where things get stuck. Almost always there are one or two points causing the bulk of the backlog, and that is where the work should start.",
          "Then we connect the flows. A bank feed brings transactions in automatically, a receipt app means a receipt is recorded where it arises rather than in arrears, and supplier invoices are received digitally and interpreted automatically. Every manual step removed is a step that can no longer be forgotten.",
          "Since summer 2024 the paper original may be destroyed once the information has been transferred to digital form in a durable way, provided nothing is lost. That makes it possible to get rid of the binders for real. We make sure the transfer meets the requirement, so the archive holds up under review.",
        ],
      },
      {
        title: "Digital workflows",
        lead: "Approval, payment and sign off in a chain that can be traced.",
        body: [
          "A workflow states what happens to a document and in what order. A supplier invoice arrives, is interpreted, coded, sent for approval to the right person and then placed on a payment list. Each step is logged, which means the question of who approved what has an answer.",
          "On the customer side it is about the invoice going out the same day the work is finished rather than at the end of the month, reminders being sent automatically, and e-invoicing under the Peppol standard working when the customer is a public body. Shortening the time between work done and payment received is the cheapest liquidity improvement a company can make.",
          "We keep the setup as simple as it can be. A flow with five approval levels in a company with three employees does not create order, it creates a bottleneck.",
        ],
      },
      {
        title: "Ongoing reporting",
        lead: "Figures every month, and someone to say what they mean.",
        body: [
          "You get an income statement and balance sheet each period, with a comparison against the previous year and against budget where one exists. The report is accrued, which means one month can be compared with another without an annual invoice distorting the picture.",
          "Beyond the report we go through what deviates. A cost line growing faster than revenue, a margin slipping, a receivable that has aged. The deviations are the information, and they are easily lost in a report that is simply sent without comment.",
          "If the company needs key figures we follow them: solidity ahead of a bank negotiation, margin per project, staff cost in relation to turnover. We pick a handful that mean something for your business rather than a dashboard nobody looks at.",
        ],
      },
      {
        title: "Routines that last",
        lead: "Order that works even in the month when nobody has time.",
        body: [
          "A routine is documented, has an owner and a point in time. Missing any of the three it is not a routine but a habit, and habits stop working as soon as someone is ill, on leave or simply has too much on. We write down who does what and when, in a form short enough to actually be read.",
          "We also build in checks that catch errors early: reconciliation against the bank each period, a check that VAT agrees with the books, follow up of overdue customer invoices. An error caught in the same month takes minutes to correct. The same error found in the annual accounts takes hours and may have affected a VAT return on the way.",
          "When the company grows or staff change we revisit the routine. What suited three employees rarely suits ten, and a routine that has not kept up with the business creates more work than it saves.",
        ],
      },
    ],
    deliverables: [
      "A map of how documents move today",
      "Bank feed and automatic transaction import",
      "Receipt app and digital supplier invoice handling",
      "E-invoicing under Peppol for public sector customers",
      "An approval flow that can be traced afterwards",
      "Monthly report with a walkthrough of deviations",
      "Documented routines with an owner and a point in time",
    ],
    faq: [
      {
        question: "Do we have to change accounting software to digitalise?",
        answer:
          "No. Most modern cloud systems handle what is needed, and it is usually the connections and the routine that are missing rather than the system. If you do need to change we will say so, but we do not propose it as the first step.",
      },
      {
        question: "May we throw away paper documents once they are scanned?",
        answer:
          "Since summer 2024 the original may be destroyed once the information has been transferred to digital form in a durable way without anything being lost. We make sure the transfer meets the requirement before you start clearing out.",
      },
      {
        question: "How long does a transition take?",
        answer:
          "The basics are usually in place within a month. We move the flow across in stages so the business does not stop, and we take whatever causes the most backlog first.",
      },
      {
        question: "What do the digital systems cost?",
        answer:
          "Software licences are billed by the supplier and sit outside our monthly price. We tell you what it comes to before you decide, and we do not recommend more systems than the business needs.",
      },
      {
        question: "How often do we get reports?",
        answer:
          "Every period, normally every month. The report is accrued and comes with a comment on what deviates, not as a file without context.",
      },
      {
        question: "There are only two of us. Do we need routines?",
        answer:
          "Yes, and especially then. In a small company there is nobody to catch what gets forgotten, which makes a simple written routine matter more there than in a large one.",
      },
    ],
  },
};
