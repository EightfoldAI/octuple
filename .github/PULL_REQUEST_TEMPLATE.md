## SUMMARY:

## GITHUB ISSUE (Open Source Contributors)

## JIRA TASK (Eightfold Employees Only):

## CHANGE TYPE:

- [ ] Bugfix Pull Request
- [ ] Feature Pull Request

## TEST COVERAGE:

- [ ] Tests for this change already exist
- [ ] I have added unittests for this change

## TEST PLAN:

### Manual a11y validation

1. `yarn storybook` and open http://localhost:6006/?path=/story/menu--menu-a11y-indexing
2. Enable NVDA (or VoiceOver). Arrow through the two items.
   • Expected: SR announces "Projects link 1 of 2" and "Courses link 2 of 2".

### Regression

3. Verify existing Menu stories render without console errors.
4. Run `npm run lint:fix:files` – no lint failures.
5. `yarn test` – all jest suites green.
