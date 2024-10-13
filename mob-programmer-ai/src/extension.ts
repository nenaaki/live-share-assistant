import { getReviewComments } from './chatGPT';
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	const outputChannel = vscode.window.createOutputChannel('Review');
	console.log('Congratulations, your extension "mob-programmer-ai" is now active!');

	const reviewDisposable = vscode.commands.registerCommand('mob-programmer-ai.reviewCode', async () => {
		const editor = vscode.window.activeTextEditor;
		if (editor) {
				const document = editor.document;
				const code = document.getText();
				console.log('Code:', code);
				if (!code) { return; }

				try {
						const comments = await getReviewComments(code);
						outputChannel.appendLine('Review Comments:\n' + comments);
						outputChannel.show();
				} catch (error) {
						vscode.window.showErrorMessage(`Failed to get review comments: ${error}`);
				}
		}
	});

	context.subscriptions.push(reviewDisposable);
}

export function deactivate() {}
