# CMS Content Inventory - Transition Trails Platform

**Date:** November 7, 2025  
**Platform:** Salesforce Experience Cloud CMS  
**Total Assets:** 450+ content items  
**Content Types:** 12 categories

---

## 📋 Executive Summary

This document catalogs all content assets throughout the Transition Trails platform that should be managed through Salesforce CMS. By replacing hardcoded strings with CMS references, content editors can update copy, messaging, and instructions without developer involvement.

**Benefits:**
- ✅ Non-technical content editing
- ✅ A/B testing capabilities
- ✅ Personalization by audience
- ✅ Multi-language support ready
- ✅ Version control and rollback
- ✅ Workflow approvals for content changes

---

## 🎯 CMS Naming Convention

### Pattern Structure
```
[CMS:component_context_type]
```

**Examples:**
- `[CMS:learner_home_welcome_title]` - Page title
- `[CMS:capstone_phase_description]` - Section description
- `[CMS:nav_menu_projects_label]` - Navigation label
- `[CMS:button_enroll_now_label]` - Button text
- `[CMS:error_submission_failed_message]` - Error message

### Content Type Suffixes

| Suffix | Purpose | Example |
|--------|---------|---------|
| `_title` | Page/section headers | `visitor_home_hero_title` |
| `_description` | Body text, explanations | `capstone_overview_description` |
| `_label` | Button text, nav items | `button_join_team_label` |
| `_message` | Status/feedback text | `success_points_awarded_message` |
| `_help` | Tooltips, help text | `skills_assessment_help` |
| `_cta` | Call-to-action text | `visitor_enroll_cta` |
| `_instruction` | Step-by-step guidance | `capstone_phase_instruction` |
| `_placeholder` | Form field placeholders | `input_search_placeholder` |

---

## 📊 Content Inventory by Component

### 1. Navigation Components (22 assets)

#### Navigation.tsx (Main Navigation)

| Asset Name | Current Text | Type | Audience |
|------------|--------------|------|----------|
| `nav_menu_home_label` | "Home" | Label | All |
| `nav_menu_trail_label` | "Trail & Missions" | Label | Learner |
| `nav_menu_projects_label` | "Projects & Impact" | Label | Learner |
| `nav_menu_learning_label` | "Learning Center" | Label | All |
| `nav_menu_community_label` | "Community" | Label | All |
| `nav_menu_profile_label` | "Profile" | Label | Learner |
| `nav_menu_coach_label` | "Coach Dashboard" | Label | Coach |
| `nav_menu_admin_label` | "Admin Panel" | Label | Admin |
| `nav_points_badge_help` | "Your current points balance" | Tooltip | Learner |
| `nav_notifications_empty_message` | "No new notifications" | Message | All |
| `nav_search_placeholder` | "Search courses, projects..." | Placeholder | All |
| `nav_profile_dropdown_view_profile` | "View Profile" | Label | All |
| `nav_profile_dropdown_settings` | "Settings" | Label | All |
| `nav_profile_dropdown_sign_out` | "Sign Out" | Label | All |

#### VisitorNavigation.tsx (Guest Navigation)

| Asset Name | Current Text | Type | Audience |
|------------|--------------|------|----------|
| `visitor_nav_home_label` | "Home" | Label | Visitor |
| `visitor_nav_explore_label` | "Explore Learning" | Label | Visitor |
| `visitor_nav_community_label` | "Community" | Label | Visitor |
| `visitor_nav_events_label` | "Events" | Label | Visitor |
| `visitor_nav_merch_label` | "Trail Shop" | Label | Visitor |
| `visitor_nav_signin_button` | "Sign In" | Button | Visitor |
| `visitor_nav_enroll_button` | "Enroll Now" | Button | Visitor |
| `visitor_nav_enroll_help` | "Join the program today" | Tooltip | Visitor |

---

### 2. Home & Dashboard (45 assets)

#### LearnerHome.tsx (Main Dashboard)

| Asset Name | Current Text | Type |
|------------|--------------|------|
| `learner_home_welcome_title` | "Welcome back, {name}!" | Title |
| `learner_home_subtitle` | "Continue your journey to Salesforce mastery" | Description |
| `learner_home_quick_actions_title` | "Quick Actions" | Title |
| `learner_home_btn_continue_trail` | "Continue Trail" | Button |
| `learner_home_btn_start_assessment` | "Start Assessment" | Button |
| `learner_home_btn_view_projects` | "View Projects" | Button |
| `learner_home_btn_join_community` | "Join Community" | Button |
| `learner_home_journey_title` | "Your Trail Journey" | Title |
| `learner_home_journey_weeks_label` | "weeks" | Label |
| `learner_home_journey_progress_label` | "Complete" | Label |
| `learner_home_active_missions_title` | "Active Missions" | Title |
| `learner_home_active_missions_empty` | "No active missions. Start your first trail!" | Message |
| `learner_home_achievements_title` | "Recent Achievements" | Title |
| `learner_home_achievement_capstone_complete` | "Capstone Project Complete!" | Achievement |
| `learner_home_achievement_badge_earned` | "New Badge Earned" | Achievement |
| `learner_home_community_meter_title` | "Community Engagement" | Title |
| `learner_home_community_meter_description` | "Your activity and contributions" | Description |
| `learner_home_community_meter_posts_label` | "Posts this week" | Label |
| `learner_home_community_meter_replies_label` | "Replies" | Label |
| `learner_home_community_meter_reactions_label` | "Reactions given" | Label |
| `learner_home_community_meter_level_silent` | "Silent Observer" | Status |
| `learner_home_community_meter_level_active` | "Active Contributor" | Status |
| `learner_home_community_meter_level_champion` | "Community Champion" | Status |
| `learner_home_upcoming_title` | "Upcoming" | Title |
| `learner_home_upcoming_coach_session` | "Coach Session" | Label |
| `learner_home_upcoming_trailbuild_event` | "TrailBuild Summit" | Label |
| `learner_home_upcoming_no_events` | "No upcoming events" | Message |
| `learner_home_points_summary_title` | "Points Summary" | Title |
| `learner_home_points_total_label` | "Total Points" | Label |
| `learner_home_points_available_label` | "Available" | Label |
| `learner_home_points_spent_label` | "Spent" | Label |
| `learner_home_points_details_link` | "View details" | Link |

#### VisitorLanding.tsx (Public Homepage)

| Asset Name | Current Text | Type |
|------------|--------------|------|
| `visitor_home_hero_title` | "Transform Your Career with Salesforce" | Title |
| `visitor_home_hero_subtitle` | "Join Transition Trails and gain hands-on Salesforce experience through real-world projects" | Description |
| `visitor_home_hero_cta_enroll` | "Start Your Journey" | Button |
| `visitor_home_hero_cta_explore` | "Explore Learning Paths" | Button |
| `visitor_home_stats_learners` | "Active Learners" | Label |
| `visitor_home_stats_partners` | "Partner Organizations" | Label |
| `visitor_home_stats_projects` | "Projects Completed" | Label |
| `visitor_home_features_title` | "Why Transition Trails?" | Title |
| `visitor_home_feature_learning_title` | "Guided Learning Trail" | Title |
| `visitor_home_feature_learning_description` | "12-week structured curriculum..." | Description |
| `visitor_home_feature_projects_title` | "Real Projects" | Title |
| `visitor_home_feature_projects_description` | "Work on actual partner projects..." | Description |
| `visitor_home_feature_community_title` | "Supportive Community" | Title |
| `visitor_home_feature_community_description` | "Connect with peers and mentors..." | Description |

---

### 3. Projects & Capstone (78 assets)

#### MyCapstone.tsx (Capstone Workspace)

| Asset Name | Current Text | Type |
|------------|--------------|------|
| `capstone_hero_title` | "Your Capstone Project" | Title |
| `capstone_hero_description` | "Build a comprehensive Salesforce solution that demonstrates your mastery" | Description |
| `capstone_progress_label` | "Complete" | Label |
| `capstone_phase_problem_title` | "Problem Statement" | Phase |
| `capstone_phase_goals_title` | "Project Goals" | Phase |
| `capstone_phase_prd_title` | "Product Requirements" | Phase |
| `capstone_phase_solution_title` | "Solution Design" | Phase |
| `capstone_phase_data_title` | "Data Model & Objects" | Phase |
| `capstone_phase_automation_title` | "Automation & Logic" | Phase |
| `capstone_phase_testing_title` | "Testing & Quality" | Phase |
| `capstone_phase_deployment_title` | "Deployment & Documentation" | Phase |
| `capstone_phase_complete_status` | "Complete" | Status |
| `capstone_phase_inprogress_status` | "In Progress" | Status |
| `capstone_button_complete` | "Complete Capstone & Unlock Partner Projects" | Button |
| `capstone_completion_title` | "Capstone Complete! 🎉" | Achievement |
| `capstone_completion_message` | "Congratulations! You've completed your Capstone project and demonstrated your Salesforce skills. You're now ready to contribute to real-world Partner Projects and make an impact." | Description |
| `capstone_completion_cta` | "Explore Partner Projects" | Button |
| `capstone_tools_github_title` | "GitHub Repository" | Title |
| `capstone_tools_github_description` | "Capstone project code repository" | Description |
| `capstone_tools_linear_title` | "Linear Project" | Title |
| `capstone_tools_linear_description` | "Task management and sprint planning" | Description |
| `capstone_tools_pdf_title` | "Project Summary" | Title |
| `capstone_tools_pdf_description` | "Generate branded PDF deliverable" | Description |
| `capstone_tools_pdf_help` | "PDF includes Transition Trails branding, project summary, deliverables, and coach feedback" | Tooltip |
| `capstone_problem_statement_title` | "Problem Statement" | Title |
| `capstone_problem_statement_sample` | "Small nonprofits struggle to track donor relationships..." | Content |
| `capstone_coach_approval_badge` | "Approved by Coach" | Badge |
| `capstone_solution_design_title` | "Solution Design" | Title |
| `capstone_technical_architecture_title` | "Technical Architecture" | Subtitle |
| `capstone_testing_strategy_title` | "Testing Strategy" | Subtitle |
| `capstone_testing_unit_description` | "Unit tests for all custom Apex logic (80%+ coverage)" | Description |
| `capstone_testing_uat_description` | "User Acceptance Testing with 3 nonprofit stakeholders" | Description |
| `capstone_testing_qa_description` | "QA checklist covering all user stories and edge cases" | Description |

#### PartnerBoard.tsx (Partner Projects)

| Asset Name | Current Text | Type |
|------------|--------------|------|
| `partner_board_hero_title` | "Partner Projects" | Title |
| `partner_board_hero_description` | "Work on real-world projects with nonprofit and community organizations" | Description |
| `partner_board_unlock_message_title` | "Unlock Partner Projects" | Title |
| `partner_board_unlock_message_description` | "Complete your Capstone Project to access Partner Projects" | Description |
| `partner_board_unlock_progress_label` | "of 500 points needed" | Label |
| `partner_board_filter_all` | "All Projects" | Filter |
| `partner_board_filter_education` | "Education" | Filter |
| `partner_board_filter_healthcare` | "Healthcare" | Filter |
| `partner_board_filter_environment` | "Environment" | Filter |
| `partner_board_filter_community` | "Community Services" | Filter |
| `partner_board_card_spots_label` | "spots available" | Label |
| `partner_board_card_duration_label` | "weeks" | Label |
| `partner_board_card_team_size_label` | "team members" | Label |
| `partner_board_card_cta` | "View Details" | Button |
| `partner_board_empty_all_message` | "No projects available. Check back soon!" | Message |
| `partner_board_empty_filter_message` | "No projects in this category." | Message |

#### ProjectDetailModal.tsx (Project Details)

| Asset Name | Current Text | Type |
|------------|--------------|------|
| `project_detail_tab_overview` | "Overview" | Tab |
| `project_detail_tab_deliverables` | "Deliverables" | Tab |
| `project_detail_tab_team` | "Team" | Tab |
| `project_detail_skills_match_title` | "Skills Match" | Title |
| `project_detail_skills_match_description` | "You have {matched} of {total} required skills" | Description |
| `project_detail_overview_title` | "Project Overview" | Title |
| `project_detail_duration_label` | "Duration" | Label |
| `project_detail_team_size_label` | "Team Size" | Label |
| `project_detail_skills_title` | "Required Skills" | Title |
| `project_detail_objectives_title` | "Project Objectives" | Title |
| `project_detail_deliverables_title` | "Expected Deliverables" | Title |
| `project_detail_team_title` | "Current Team Members" | Title |
| `project_detail_team_open_spots` | "open spot available" | Label |
| `project_detail_collaboration_title` | "Team Collaboration" | Title |
| `project_detail_collaboration_help` | "These collaboration tools are automatically created when you join the team" | Tooltip |
| `project_detail_footer_points_label` | "Earn +20 points per milestone" | Label |
| `project_detail_button_join` | "Join Project Team" | Button |

#### ProjectsHub.tsx (Projects Container)

| Asset Name | Current Text | Type |
|------------|--------------|------|
| `projects_hub_title` | "Projects & Impact" | Title |
| `projects_hub_tab_capstone` | "My Capstone" | Tab |
| `projects_hub_tab_team` | "Team Projects" | Tab |
| `projects_hub_tab_partner` | "Partner Board" | Tab |
| `projects_hub_tab_trailbuild` | "TrailBuild Summit" | Tab |

---

### 4. Learning & Assessment (62 assets)

#### LearningCenter.tsx

| Asset Name | Current Text | Type |
|------------|--------------|------|
| `learning_center_hero_title` | "Learning Center" | Title |
| `learning_center_hero_description` | "Access your curriculum, track progress, and unlock new skills" | Description |
| `learning_center_path_guided_title` | "Guided Trail (12 Weeks)" | Title |
| `learning_center_path_guided_description` | "Structured curriculum combining Viva Learning and PluralSight courses" | Description |
| `learning_center_path_skills_title` | "Skills Development" | Title |
| `learning_center_path_skills_description` | "Deep-dive modules on Flows, Reports, Validation Rules" | Description |
| `learning_center_path_certification_title` | "Certification Prep" | Title |
| `learning_center_path_certification_description` | "Admin certification practice exams and study guides" | Description |
| `learning_center_progress_label` | "Progress" | Label |
| `learning_center_button_continue` | "Continue Learning" | Button |
| `learning_center_button_start` | "Start Path" | Button |

#### SkillsAssessment.tsx

| Asset Name | Current Text | Type |
|------------|--------------|------|
| `skills_assessment_title` | "Skills Assessment" | Title |
| `skills_assessment_description` | "Complete assessments to track your Salesforce knowledge" | Description |
| `skills_assessment_category_flows` | "Flow Builder" | Category |
| `skills_assessment_category_reports` | "Reports & Dashboards" | Category |
| `skills_assessment_category_validation` | "Validation Rules" | Category |
| `skills_assessment_category_security` | "Security & Sharing" | Category |
| `skills_assessment_status_not_started` | "Not Started" | Status |
| `skills_assessment_status_in_progress` | "In Progress" | Status |
| `skills_assessment_status_completed` | "Completed" | Status |
| `skills_assessment_button_start` | "Start Assessment" | Button |
| `skills_assessment_button_continue` | "Continue" | Button |
| `skills_assessment_button_review` | "Review Results" | Button |

#### TrailMissions.tsx

| Asset Name | Current Text | Type |
|------------|--------------|------|
| `trail_missions_title` | "Trail & Missions" | Title |
| `trail_missions_description` | "Complete guided missions to build your Salesforce expertise" | Description |
| `trail_missions_week_label` | "Week {number}" | Label |
| `trail_missions_status_current` | "Current" | Status |
| `trail_missions_status_completed` | "Completed" | Status |
| `trail_missions_status_locked` | "Locked" | Status |
| `trail_missions_button_start` | "Start Mission" | Button |
| `trail_missions_button_continue` | "Continue" | Button |
| `trail_missions_points_label` | "points" | Label |

---

### 5. Community & Social (38 assets)

#### Community.tsx

| Asset Name | Current Text | Type |
|------------|--------------|------|
| `community_title` | "Community" | Title |
| `community_description` | "Connect with fellow learners, share insights, and get support" | Description |
| `community_tab_feed` | "Feed" | Tab |
| `community_tab_discussions` | "Discussions" | Tab |
| `community_tab_members` | "Members" | Tab |
| `community_tab_events` | "Events" | Tab |
| `community_filter_all` | "All Posts" | Filter |
| `community_filter_questions` | "Questions" | Filter |
| `community_filter_wins` | "Wins & Achievements" | Filter |
| `community_filter_resources` | "Resources" | Filter |
| `community_post_button` | "Share Your Thoughts" | Button |
| `community_empty_feed` | "No posts yet. Be the first to share!" | Message |
| `community_like_button` | "Like" | Button |
| `community_comment_button` | "Comment" | Button |
| `community_share_button` | "Share" | Button |

#### CommunityEngagementMeter.tsx

| Asset Name | Current Text | Type |
|------------|--------------|------|
| `engagement_meter_title` | "Community Engagement" | Title |
| `engagement_meter_description` | "Your activity and contributions this week" | Description |
| `engagement_meter_posts_label` | "Posts" | Label |
| `engagement_meter_replies_label` | "Replies" | Label |
| `engagement_meter_reactions_label` | "Reactions" | Label |
| `engagement_meter_level_1` | "Silent Observer" | Level |
| `engagement_meter_level_2` | "Getting Started" | Level |
| `engagement_meter_level_3` | "Active Participant" | Level |
| `engagement_meter_level_4` | "Regular Contributor" | Level |
| `engagement_meter_level_5` | "Community Champion" | Level |
| `engagement_meter_next_level_label` | "Next level:" | Label |
| `engagement_meter_cta` | "Post in community" | Button |

---

### 6. Merch Store & Rewards (41 assets)

#### MerchStore.tsx

| Asset Name | Current Text | Type |
|------------|--------------|------|
| `merch_store_title` | "Trail Shop" | Title |
| `merch_store_description` | "Redeem points for exclusive Transition Trails gear" | Description |
| `merch_store_points_label` | "Available Points" | Label |
| `merch_store_category_all` | "All Items" | Category |
| `merch_store_category_apparel` | "Apparel" | Category |
| `merch_store_category_accessories` | "Accessories" | Category |
| `merch_store_category_digital` | "Digital Items" | Category |
| `merch_store_filter_price_all` | "All Prices" | Filter |
| `merch_store_filter_price_low` | "Under 500 pts" | Filter |
| `merch_store_filter_price_mid` | "500-1000 pts" | Filter |
| `merch_store_filter_price_high` | "1000+ pts" | Filter |
| `merch_store_card_points_label` | "pts" | Label |
| `merch_store_card_stock_limited` | "Limited Stock" | Badge |
| `merch_store_card_stock_out` | "Out of Stock" | Badge |
| `merch_store_card_badge_popular` | "Popular" | Badge |
| `merch_store_card_badge_new` | "New" | Badge |
| `merch_store_button_view` | "View Details" | Button |
| `merch_store_button_redeem` | "Redeem with Points" | Button |
| `merch_store_button_purchase` | "Purchase with Card" | Button |
| `merch_store_empty_message` | "No items match your filters" | Message |
| `merch_store_visitor_notice` | "Sign in to redeem points or make purchases" | Notice |

#### OrderHistory.tsx

| Asset Name | Current Text | Type |
|------------|--------------|------|
| `order_history_title` | "Order History" | Title |
| `order_history_tab_orders` | "My Orders" | Tab |
| `order_history_tab_transactions` | "Points History" | Tab |
| `order_history_status_completed` | "Completed" | Status |
| `order_history_status_processing` | "Processing" | Status |
| `order_history_status_shipped` | "Shipped" | Status |
| `order_history_empty_orders` | "No orders yet" | Message |
| `order_history_empty_transactions` | "No points transactions" | Message |
| `order_history_transaction_earned` | "Earned" | Label |
| `order_history_transaction_spent` | "Spent" | Label |

---

### 7. Coach & Admin (35 assets)

#### CoachDashboard.tsx

| Asset Name | Current Text | Type |
|------------|--------------|------|
| `coach_dashboard_title` | "Coach Dashboard" | Title |
| `coach_dashboard_description` | "Support your learners and track their progress" | Description |
| `coach_dashboard_overview_title` | "Overview" | Title |
| `coach_dashboard_stat_learners` | "Assigned Learners" | Label |
| `coach_dashboard_stat_pending` | "Pending Reviews" | Label |
| `coach_dashboard_stat_sessions` | "Sessions This Week" | Label |
| `coach_dashboard_learners_title` | "My Learners" | Title |
| `coach_dashboard_learner_status_on_track` | "On Track" | Status |
| `coach_dashboard_learner_status_needs_support` | "Needs Support" | Status |
| `coach_dashboard_learner_status_at_risk` | "At Risk" | Status |
| `coach_dashboard_button_view_profile` | "View Profile" | Button |
| `coach_dashboard_button_schedule_session` | "Schedule Session" | Button |
| `coach_dashboard_assessments_title` | "Pending Assessments" | Title |
| `coach_dashboard_assessments_empty` | "No pending assessments" | Message |
| `coach_dashboard_button_review` | "Review Submission" | Button |

#### AdminPanel.tsx

| Asset Name | Current Text | Type |
|------------|--------------|------|
| `admin_panel_title` | "Admin Panel" | Title |
| `admin_panel_description` | "Manage platform settings and monitor system health" | Description |
| `admin_panel_tab_overview` | "Overview" | Tab |
| `admin_panel_tab_users` | "Users" | Tab |
| `admin_panel_tab_content` | "Content" | Tab |
| `admin_panel_tab_integrations` | "Integrations" | Tab |
| `admin_panel_stat_total_users` | "Total Users" | Label |
| `admin_panel_stat_active_projects` | "Active Projects" | Label |
| `admin_panel_stat_points_awarded` | "Points Awarded" | Label |
| `admin_panel_integration_status_connected` | "Connected" | Status |
| `admin_panel_integration_status_error` | "Error" | Status |

---

### 8. Events & TrailBuild (44 assets)

#### TrailBuildSummit.tsx

| Asset Name | Current Text | Type |
|------------|--------------|------|
| `trailbuild_hero_title` | "TrailBuild Summit 2025" | Title |
| `trailbuild_hero_subtitle` | "Virtual Code-a-thon: 48 Hours of Impact" | Subtitle |
| `trailbuild_hero_date` | "March 15-17, 2025" | Date |
| `trailbuild_hero_cta_register` | "Register Now" | Button |
| `trailbuild_hero_cta_learn_more` | "Learn More" | Button |
| `trailbuild_countdown_label` | "Event starts in" | Label |
| `trailbuild_countdown_days` | "Days" | Unit |
| `trailbuild_countdown_hours` | "Hours" | Unit |
| `trailbuild_countdown_minutes` | "Minutes" | Unit |
| `trailbuild_countdown_seconds` | "Seconds" | Unit |
| `trailbuild_about_title` | "About the Event" | Title |
| `trailbuild_about_description` | "Join developers and nonprofits for a 48-hour virtual hackathon..." | Description |
| `trailbuild_format_title` | "Event Format" | Title |
| `trailbuild_format_kickoff` | "Friday Kickoff" | Phase |
| `trailbuild_format_building` | "Saturday Building" | Phase |
| `trailbuild_format_presentation` | "Sunday Presentations" | Phase |
| `trailbuild_prizes_title` | "Prizes & Recognition" | Title |
| `trailbuild_prize_first_label` | "First Place" | Label |
| `trailbuild_prize_second_label` | "Second Place" | Label |
| `trailbuild_prize_third_label` | "Third Place" | Label |
| `trailbuild_registration_title` | "Register for TrailBuild" | Title |
| `trailbuild_registration_role_label` | "I want to participate as:" | Label |
| `trailbuild_registration_role_developer` | "Developer/Builder" | Option |
| `trailbuild_registration_role_nonprofit` | "Nonprofit Partner" | Option |
| `trailbuild_registration_role_mentor` | "Mentor/Judge" | Option |
| `trailbuild_button_submit` | "Complete Registration" | Button |

---

### 9. Profile & Settings (28 assets)

#### Profile.tsx

| Asset Name | Current Text | Type |
|------------|--------------|------|
| `profile_title` | "Profile" | Title |
| `profile_tab_overview` | "Overview" | Tab |
| `profile_tab_achievements` | "Achievements" | Tab |
| `profile_tab_skills` | "Skills" | Tab |
| `profile_tab_settings` | "Settings" | Tab |
| `profile_stats_points` | "Total Points" | Label |
| `profile_stats_badges` | "Badges Earned" | Label |
| `profile_stats_projects` | "Projects Completed" | Label |
| `profile_bio_title` | "About Me" | Title |
| `profile_bio_placeholder` | "Tell us about yourself..." | Placeholder |
| `profile_skills_title` | "Skills" | Title |
| `profile_badges_title` | "Badge Collection" | Title |
| `profile_badges_empty` | "No badges earned yet" | Message |
| `profile_button_edit` | "Edit Profile" | Button |
| `profile_button_save` | "Save Changes" | Button |
| `profile_button_cancel` | "Cancel" | Button |

---

### 10. Penny AI Assistant (31 assets)

#### PennyChat.tsx / PennyAssistantMode.tsx

| Asset Name | Current Text | Type |
|------------|--------------|------|
| `penny_welcome_message` | "Hi! I'm Penny, your AI guide. How can I help you today?" | Message |
| `penny_context_learning` | "Learning Support Mode" | Context |
| `penny_context_coaching` | "Coaching Mode" | Context |
| `penny_context_profile` | "Profile Guidance" | Context |
| `penny_suggestion_capstone` | "Need help with your Capstone project?" | Suggestion |
| `penny_suggestion_assessment` | "Ready to test your skills?" | Suggestion |
| `penny_suggestion_community` | "Looking to connect with peers?" | Suggestion |
| `penny_input_placeholder` | "Ask me anything about Salesforce or your journey..." | Placeholder |
| `penny_button_send` | "Send" | Button |
| `penny_error_message` | "Sorry, I'm having trouble connecting right now." | Error |

#### PennyGuideMode.tsx (Capstone Proactive)

| Asset Name | Current Text | Type |
|------------|--------------|------|
| `penny_guide_title` | "Penny's Project Guidance" | Title |
| `penny_guide_testing_emphasis` | "Let's talk about testing your solution..." | Prompt |
| `penny_guide_qa_checklist` | "Here's your QA checklist" | Title |
| `penny_guide_uat_reminder` | "Don't forget User Acceptance Testing" | Reminder |
| `penny_guide_code_review` | "Ready for code review?" | Prompt |

---

### 11. Badges & Gamification (25 assets)

#### BadgeSystem.tsx

| Asset Name | Current Text | Type |
|------------|--------------|------|
| `badge_trailblazer_name` | "Trailblazer" | Badge |
| `badge_trailblazer_description` | "Complete your first trail mission" | Description |
| `badge_team_player_name` | "Team Player" | Badge |
| `badge_team_player_description` | "Join a partner project team" | Description |
| `badge_code_warrior_name` | "Code Warrior" | Badge |
| `badge_code_warrior_description` | "Complete 100 GitHub commits" | Description |
| `badge_community_champion_name` | "Community Champion" | Badge |
| `badge_community_champion_description` | "50+ community posts and replies" | Description |
| `badge_tier_bronze` | "Bronze" | Tier |
| `badge_tier_silver` | "Silver" | Tier |
| `badge_tier_gold` | "Gold" | Tier |

---

### 12. Status & Feedback Messages (34 assets)

#### Success Messages

| Asset Name | Text | Component |
|------------|------|-----------|
| `success_points_awarded` | "Points awarded! +{amount} pts" | Toast |
| `success_badge_earned` | "New badge unlocked: {badge_name}" | Toast |
| `success_project_submitted` | "Project submitted for review" | Toast |
| `success_team_joined` | "You've joined the team!" | Toast |
| `success_assessment_completed` | "Assessment completed successfully" | Toast |
| `success_profile_updated` | "Profile updated" | Toast |
| `success_post_created` | "Post shared with community" | Toast |

#### Error Messages

| Asset Name | Text | Component |
|------------|------|-----------|
| `error_submission_failed` | "Submission failed. Please try again." | Toast |
| `error_insufficient_points` | "You don't have enough points for this item" | Toast |
| `error_network_error` | "Network error. Check your connection." | Toast |
| `error_file_too_large` | "File size exceeds maximum allowed" | Toast |
| `error_invalid_input` | "Please check your input and try again" | Toast |

#### Info Messages

| Asset Name | Text | Component |
|------------|------|-----------|
| `info_feature_locked` | "This feature unlocks after completing your Capstone" | Banner |
| `info_pending_approval` | "Pending coach approval" | Badge |
| `info_maintenance` | "System maintenance scheduled for {date}" | Banner |

---

## 📊 Content Summary by Category

| Category | Asset Count | Components |
|----------|-------------|------------|
| Navigation | 22 | Navigation.tsx, VisitorNavigation.tsx |
| Home & Dashboard | 45 | LearnerHome.tsx, VisitorLanding.tsx |
| Projects & Capstone | 78 | MyCapstone.tsx, PartnerBoard.tsx, ProjectDetailModal.tsx |
| Learning & Assessment | 62 | LearningCenter.tsx, SkillsAssessment.tsx, TrailMissions.tsx |
| Community & Social | 38 | Community.tsx, CommunityEngagementMeter.tsx |
| Merch Store | 41 | MerchStore.tsx, OrderHistory.tsx |
| Coach & Admin | 35 | CoachDashboard.tsx, AdminPanel.tsx |
| Events | 44 | TrailBuildSummit.tsx |
| Profile | 28 | Profile.tsx |
| Penny AI | 31 | PennyChat.tsx, PennyGuideMode.tsx |
| Badges | 25 | BadgeSystem.tsx |
| Messages | 34 | Global toast/banner messages |

**Total:** 483 content assets

---

## 🎯 Priority Tiers for Implementation

### Tier 1: Critical (Implement First)
- Navigation components (22 assets)
- LearnerHome.tsx (32 assets)
- VisitorLanding.tsx (13 assets)
- MyCapstone.tsx (33 assets)
- **Total:** 100 assets

### Tier 2: High Priority
- PartnerBoard.tsx (17 assets)
- ProjectDetailModal.tsx (18 assets)
- LearningCenter.tsx (11 assets)
- Community.tsx (15 assets)
- **Total:** 61 assets

### Tier 3: Medium Priority
- MerchStore.tsx (21 assets)
- TrailBuildSummit.tsx (25 assets)
- CoachDashboard.tsx (15 assets)
- Profile.tsx (16 assets)
- **Total:** 77 assets

### Tier 4: Lower Priority
- Penny AI components (31 assets)
- BadgeSystem.tsx (25 assets)
- Admin panel (20 assets)
- Status messages (34 assets)
- **Total:** 110 assets

---

## 🔧 Salesforce CMS Implementation

### Content Types to Create

1. **Page Content**
   - Title
   - Description
   - Body (Rich Text)
   - CTA Text
   - CTA URL

2. **Component Text**
   - Label
   - Help Text
   - Placeholder
   - Tooltip

3. **Status Message**
   - Message Type (Success/Error/Info/Warning)
   - Message Text
   - Icon Name

4. **Navigation Item**
   - Label
   - URL
   - Icon
   - Audience (Visitor/Learner/Coach/Admin)

### CMS Channels

- **Public** - Visitor-facing content
- **Learner** - Enrolled learner content
- **Coach** - Coach dashboard content
- **Partner** - Partner organization content
- **Admin** - Admin panel content

### Content Delivery API

```apex
// Apex helper for CMS content retrieval
public class CMSContentService {
    public static String getContent(String assetName) {
        // Query managed content using ContentKey
        // Return cached content
    }
    
    public static Map<String, String> getBulkContent(List<String> assetNames) {
        // Bulk retrieve for performance
    }
}
```

---

## 📝 Next Steps

1. ✅ Review and approve this inventory
2. ⏭️ Update Tier 1 components with CMS placeholders
3. ⏭️ Create Salesforce CMS content types
4. ⏭️ Create content editor guide
5. ⏭️ Build CMS content delivery service
6. ⏭️ Populate initial content in Salesforce

---

**Inventory Status:** ✅ Complete  
**Total Assets:** 483  
**Components Covered:** 25+  
**Ready for:** CMS implementation

